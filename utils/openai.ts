'use client';
// import OpenAI from 'openai';
const OpenAI = require('openai').default;

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true });
const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

const generateImage = async (p: string): Promise<string> => {
  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt: p,
    n: 1,
    size: "256x256",
  });
  return response.data[0].url ?? "";
}

generateImage("a turtle").then(url => console.log(url))
// export { generateImage };