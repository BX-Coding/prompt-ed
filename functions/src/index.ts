import fetch from "node-fetch";
import { defineSecret } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";

// Interface Functions
import { imageFunctions } from "./imageFunctions";
import { moderationFunctions } from "./moderationFunctions";
import { chatFunctions } from "./textFunctions";

// Define cloud secrets to be used
const prodiaKey = defineSecret("prodia-key");
const moderationKey = defineSecret("moderation-key");
const openAiKey = defineSecret("openai-key");

interface TextModerationResponse {
  Positive: number;
  Negative: number;
  Neutral: number;
  Mixed: number;
}

exports.generateImage = onRequest(
  { secrets: [prodiaKey, moderationKey] },
  async (request, response) => {
    const prompt = request.body?.data?.prompt;

    if (!prompt) {
      response.status(400).send("Invalid request: missing prompt");
      return;
    }

    const textModerationRes: TextModerationResponse =
      await moderationFunctions.moderateText(prompt, moderationKey.value());
    if (textModerationRes.Negative > 0.5) {
      console.log("Negative flags in prompt detected.");
      response.status(403).send("Negative flags have been detected in prompt!");
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

      try {
        // Get image moderation response
        const imageModerationRes = await moderationFunctions.moderateImage(
          prodiaResponse,
          moderationKey.value()
        );
        // Check if moderation response is empty (empty means no flags in image has been detected) then respond with image
        if (JSON.stringify(imageModerationRes) == "{}") {
          console.log("No negative flags detected in image");
          const imageArrayBuffer = await fetch(prodiaResponse, {
            method: "GET",
          }).then((res) => res.arrayBuffer());

          const imageData = new Uint8Array(imageArrayBuffer);

          response.send({
            created: new Date(),
            data: imageData,
          });
        } else {
          console.log("Negative flags detected in image!");
          response
            .status(403)
            .send("Negative flags have been detected in image!");
        }
      } catch (e) {
        console.error("Error moderating image:", e);
        response.status(500).send("Error moderating image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      response.status(500).send("Error generating image");
    }
  }
);

exports.createChat = onRequest(
  { secrets: [openAiKey, moderationKey] },
  async (request, response) => {
    const prompt = request.body?.data?.prompt;

    try {
      const chatResponse = await chatFunctions.openAiChatRequest(
        prompt,
        openAiKey.value()
      );

      const messageContent = chatResponse.message.content;
      response.send({ data: messageContent });
    } catch (e) {
      console.error("Error generating chat:", e);
      response.status(500).send("Error generating chat");
    }
  }
);
