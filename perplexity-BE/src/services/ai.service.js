import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage, tool, createAgent } from "langchain";
import * as z from "zod";
import { searchInternet } from "./internet.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
});

const searchInternetTool = tool(
  searchInternet,
  {
    name: "search_internet",
    description: "Search the internet for latest information",
    schema: z.object({
      query: z.string().describe("The query to search the internet for")
    })
  }
)

const agent = createAgent({
  model: geminiModel,
  tools: [searchInternetTool],
})

export const generateResponse = async (messages) => {

  const response = await agent.invoke({
    messages: messages.map( msg => {
      if(msg.role == 'user'){
        return new HumanMessage(msg.content);
      }
      else{
        return new AIMessage(msg.content);
      }
    })
  });
  return response.messages[response.messages.length - 1].text;
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