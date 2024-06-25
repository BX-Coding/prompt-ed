import fetch from "node-fetch";
import { defineSecret } from "firebase-functions/params";
import { HttpsError, onCall } from "firebase-functions/v2/https";

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

exports.generateImageCall = onCall(
  { cors: true, secrets: [prodiaKey, moderationKey] },
  async (request) => {
    const prompt = request.data?.prompt;

    if (!prompt) {
      throw new HttpsError("invalid-argument", "missing prompt");
    }

    const textModerationRes: TextModerationResponse =
      await moderationFunctions.moderateText(prompt, moderationKey.value());
    if (textModerationRes.Negative > 0.5) {
      console.log("Negative flags in prompt detected.");
      throw new HttpsError(
        "permission-denied",
        "Negative flags have been detected in prompt!"
      );
    }

    try {
      const prodiaResponse = await imageFunctions.prodiaRequest(
        prompt,
        prodiaKey.value()
      );

      if (prodiaResponse === "") {
        throw new HttpsError("internal", "Failed to generate image");
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

          return {
            created: new Date(),
            data: imageData,
          };
        } else {
          console.log("Negative flags detected in image!");
          throw new HttpsError(
            "permission-denied",
            "Negative flags have been detected in image!"
          );
        }
      } catch (e) {
        console.error("Error moderating image:", e);
        throw new HttpsError("internal", "Error moderating image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      throw new HttpsError("internal", "Error generating image");
    }
  }
);

exports.createChat = onCall(
  { cors: true, secrets: [openAiKey, moderationKey] },
  async (request) => {
    const messages = request.data?.messages;
    try {
      const prompt = messages[messages.length-1].content
      const textModerationRes: TextModerationResponse =
        await moderationFunctions.moderateText(prompt, moderationKey.value());
      if (textModerationRes.Negative > 0.75) {
        console.log("Negative flags in prompt detected.");
        throw new HttpsError(
          "permission-denied",
          "Negative flags have been detected in prompt!"
        );
      } else {
        console.log("No negative flags detected in prompt.");
      }

      const chatResponse = await chatFunctions.openAiChatRequest(
        messages,
        openAiKey.value()
      );
      const messageContent = chatResponse.message.content;
      return messageContent;
    } catch (e) {
      console.error("Error generating chat:", e);
      throw new HttpsError("permission-denied", "Error generating chat");
    }
  }
);
