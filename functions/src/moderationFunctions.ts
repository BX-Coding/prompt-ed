import * as functions from "firebase-functions";
const axios = require("axios");

const apiKey = functions.config().textmoderation.apikey;

interface ModerationFunctions {
  moderateText: (text: string) => Promise<any>;
  moderateImage: (imageUrl: string) => Promise<any>;
}

export const moderationFunctions: ModerationFunctions = {
  moderateText: async (text: string) => {
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
      throw new Error("Error moderating text");
    }
  },
  moderateImage: async (imageUrl: string) => {
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
      throw new Error("Error moderating image");
    }
  },
};
