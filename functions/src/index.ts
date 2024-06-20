import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import OpenAI from "openai";
import { defineString } from "firebase-functions/params";
import * as functions from "firebase-functions";
const openaiKey = defineString("OPENAI_API_KEY");
const axios = require("axios");

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const dalleRequest = async (openai: OpenAI, prompt: string) => {
  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt: prompt,
    n: 1,
    size: "256x256",
  });
  return response;
};

export const generateImage = onRequest(
  { cors: true },
  async (
    request: { body: { data: { prompt: any } } },
    response: { send: (arg0: any) => void }
  ) => {
    const openai = new OpenAI({ apiKey: openaiKey.value() });

    const prompt = request.body.data.prompt;
    logger.info(
      `Recieved ${request.body.data} Requesting dalle with prompt ${prompt}`,
      { structuredData: true }
    );
    const dalleResponse = await dalleRequest(openai, prompt);
    response.send(dalleResponse);
  }
);

const apiKey = functions.config().textmoderation.apikey;

export const moderateText = async (text: string) => {
  const endpoint =
    "https://4s77vb8f38.execute-api.us-east-2.amazonaws.com/Deploy/text-moderation";
  try {
    const response = await axios.post(
      endpoint,
      { text: text },
      {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error moderating text :", error);
  }
};

export const moderateImage = async (imageUrl: string) => {
  const endpoint =
    "https://4s77vb8f38.execute-api.us-east-2.amazonaws.com/Deploy/image-moderation";
  try {
    const response = await axios.post(
      endpoint,
      { image_url: imageUrl },
      {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error moderating image :", error);
  }
};
