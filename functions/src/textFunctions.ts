import OpenAI from "openai";

interface ChatFunctions {
  openAiChatRequest: (
    messages: ChatHistoryMessage[],
    apiKey: string
  ) => Promise<any>;
}

interface ChatHistoryMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export const chatFunctions: ChatFunctions = {
  openAiChatRequest: async (messages: ChatHistoryMessage[], apiKey) => {
    const openai = new OpenAI({ apiKey: apiKey });
    try {
      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo-16k",
      });

      return completion.choices[0];
    } catch (error) {
      console.error("Error creating chat completion:", error);
      throw new Error("Error creating chat completion:");
    }
  },
};
