const axios = require("axios");

interface ModerationFunctions {
  moderateText: (text: string, apiKey:string) => Promise<any>;
  moderateImage: (imageUrl: string, apiKey:string) => Promise<any>;
}

export const moderationFunctions: ModerationFunctions = {
  moderateText: async (text: string, apiKey:string) => {
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
  moderateImage: async (imageUrl: string, apiKey:string) => {
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
