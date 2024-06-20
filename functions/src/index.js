/*import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import OpenAI from "openai";
import {defineString} from "firebase-functions/params";
const openaiKey = defineString("OPENAI_API_KEY");*/

/*{
  "created": 1589478378,
  "data": [
    {
      "url": "https://..."
    },
    {
      "url": "https://..."
    }
  ]
}*/

const {onRequest} = require("firebase-functions/v2/https");

const OpenAI = require("openai");

const openaiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const dalleRequest = async (openai, prompt) => {
  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt: prompt,
    n: 1,
    size: "256x256",
  });
  return response;
};

exports.generateImage = onRequest(
  { cors: true },
  //async (request: { body: { data: { prompt: any; }; }; }, response: { send: (arg0: any) => void; }) => {
  async (request, response) => {
    const openai = new OpenAI({apiKey: openaiKey});

    const prompt = request.body.data.prompt;
    /*logger.info(
      `Recieved ${request.body.data} Requesting dalle with prompt ${prompt}`,
      {structuredData: true});*/
      
    var imageab;

    const dalleResponse = await dalleRequest(openai, prompt);
    console.log(dalleResponse.data[0].url);
    //response.send(dalleResponse);
    imageab = await fetch(dalleResponse.data[0].url, {
      method: 'GET'
    }).then((response) => response.arrayBuffer());

    response.send({
      "created": new Date(),
      "data": new Uint8Array(imageab)
    });
  });