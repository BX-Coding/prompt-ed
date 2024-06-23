import { createProdia } from "prodia";

interface ImageFunctions {
  prodiaRequest: (prompt: string, key: string) => Promise<string>;
}

export const imageFunctions: ImageFunctions = {
  prodiaRequest: async (prompt: string, key: string) => {
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
  },
};
