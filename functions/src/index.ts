import fetch from "node-fetch";
import { defineSecret } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";

import { imageFunctions } from "./imageFunctions";
// import { moderationFunctions } from "./moderationFunctions";

// Define cloud secrets to be used
const prodiaKey = defineSecret("prodia-key");
const moderationKey = defineSecret("moderation-key")

exports.generateImage = onRequest(
  { secrets: [prodiaKey, moderationKey] },
  async (request, response) => {
    const prompt = request.body?.data?.prompt;

    if (!prompt) {
      response.status(400).send("Invalid request: missing prompt");
      return;
    }

    try {
      const prodiaResponse = await imageFunctions.prodiaRequest(
        prompt,
        prodiaKey.value()
      );

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
