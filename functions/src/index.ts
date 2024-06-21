import fetch from "node-fetch";
import { createProdia } from "prodia";
import { defineSecret } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";

const prodiaKey = defineSecret("prodia-key");

const prodiaRequest = async (prompt: string, key: string): Promise<string> => {
  const prodia = createProdia({
    apiKey: key,
  });

  const job = await prodia.generate({
    prompt: prompt,
    model: "v1-5-pruned-emaonly.safetensors [d7049739]",
  });

  const { imageUrl, status } = await prodia.wait(job);

  if (status === "succeeded") {
    return imageUrl;
  } else {
    return "";
  }
};

exports.generateImage = onRequest(
  { secrets: [prodiaKey] },
  async (request, response) => {
    const prompt = request.body?.data?.prompt;

    if (!prompt) {
      response.status(400).send("Invalid request: missing prompt");
      return;
    }

    try {
      const prodiaResponse = await prodiaRequest(prompt, prodiaKey.value());

      if (prodiaResponse === "") {
        response.status(500).send("Failed to generate image");
        return;
      }

      const imageArrayBuffer = await fetch(prodiaResponse, {
        method: "GET",
      }).then((res) => res.arrayBuffer());

      const imageData = new Uint8Array(imageArrayBuffer);

      response.send({
        created: new Date(),
        data: imageData,
      });
    } catch (error) {
      console.error("Error generating image:", error);
      response.status(500).send("Error generating image");
    }
  }
);
