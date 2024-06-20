import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import { createProdia } from 'prodia';

const prodiaKey = functions.config().prodia.key;

const prodiaRequest = async (prompt: string): Promise<string> => {
  const prodia = createProdia({
    apiKey: prodiaKey,
  });

  const job = await prodia.generate({
    prompt: prompt,
    model: 'v1-5-pruned-emaonly.safetensors [d7049739]',
  });

  const { imageUrl, status } = await prodia.wait(job);

  if (status === 'succeeded') {
    return imageUrl;
  } else {
    return '';
  }
};

export const generateImage = functions.https.onRequest(
  async (request: functions.https.Request, response: functions.Response<any>) => {
    const prompt = request.body?.data?.prompt;

    if (!prompt) {
      response.status(400).send('Invalid request: missing prompt');
      return;
    }

    try {
      const prodiaResponse = await prodiaRequest(prompt);

      if (prodiaResponse === '') {
        response.status(500).send('Failed to generate image');
        return;
      }

      const imageArrayBuffer = await fetch(prodiaResponse, {
        method: 'GET',
      }).then((res) => res.arrayBuffer());

      const imageData = new Uint8Array(imageArrayBuffer);

      response.send({
        created: new Date(),
        data: imageData,
      });
    } catch (error) {
      console.error('Error generating image:', error);
      response.status(500).send('Error generating image');
    }
  }
);
