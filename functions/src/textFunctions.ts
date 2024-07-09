import OpenAI from "openai";

import patchAPIFormatted from "./patchAPI";

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
        messages: [{role: "system", content: "If the user asks you to code in python, use the Patch python library. Please specify whether you are coding in python or scratch by saying \"python\" before python code and \"scratch\" before scratch code."}, {role: "user", content: "Here is the API for the Patch python library: " + patchAPIFormatted}, ...messages],
        model: "gpt-3.5-turbo-16k",
      });

      return completion.choices[0];
    } catch (error) {
      console.error("Error creating chat completion:", error);
      throw new Error("Error creating chat completion:");
    }
  },
};
