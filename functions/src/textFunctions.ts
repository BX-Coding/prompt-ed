import OpenAI from "openai";

interface ChatFunctions {
  openAiChatRequest: (prompt: string, apiKey: string) => Promise<any>;
}

export const chatFunctions: ChatFunctions = {
  openAiChatRequest: async (prompt, apiKey) => {
    const openai = new OpenAI({apiKey:apiKey});
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo-16k",
      });

      return completion.choices[0];
    } catch (error) {
      console.error("Error creating chat completion:", error);
      throw new Error("Error creating chat completion:");
    }
  },
};
