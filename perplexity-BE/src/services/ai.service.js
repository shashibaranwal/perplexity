import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage } from "langchain";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
});

export const generateResponse = async (message) => {
  const response = await geminiModel.invoke([
    new HumanMessage(message)
  ]);
  return response.text;
}

export const generateChatTitle = async (message) => {
  const response = await mistralModel.invoke([
    new SystemMessage(`
      You are a chat title generator. 
      Given a chat history, generate a concise and descriptive title for the chat.
      Return only the title, without any additional text.
      User will provide you with the first message of the chat.
      Generate a title for the chat based on the first message in 2-4 words.
    `),

    new HumanMessage(`
      Generate a title for the chat based on the following first message:
      ${message}
    `)
  ]);
  return response.text;
}