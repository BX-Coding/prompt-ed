import fetch from "node-fetch";
import { defineSecret } from "firebase-functions/params";
import { HttpsError, onCall } from "firebase-functions/v2/https";

// Interface Functions
import { imageFunctions } from "./imageFunctions";
import { moderationFunctions } from "./moderationFunctions";

// Define cloud secrets to be used
const prodiaKey = defineSecret("prodia-key");
const moderationKey = defineSecret("moderation-key");

interface TextModerationResponse {
  Positive: number;
  Negative: number;
  Neutral: number;
  Mixed: number;
}

exports.generateImage = onCall(
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
