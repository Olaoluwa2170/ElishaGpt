import OpenAI from "openai";
import { conversationResp } from "../repository/conversation.repository";
import template from '../prompts/chatbot.txt';
import fs from 'fs';
import path from 'path';

// Load the prompt from the text file
const parkInfo = fs.readFileSync(path.join(__dirname, '..', 'prompts', 'WonderWorld.md'), 'utf-8');

const instructions = template.replace('{{parkInfo}}', parkInfo);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type SendMessageResponse = {
    id: string;
    message: string;
}


export const chatService = {
    sendMessage: async (prompt: string, conversationId: string): Promise<SendMessageResponse> => {
        const response = await client.responses.create({
          model: "gpt-4o-mini",
          input: prompt,
          instructions,
          temperature: 0.2,
          max_output_tokens: 100,
          previous_response_id:
            conversationResp.getConversationId(conversationId),
        });

        conversationResp.setConversationId(conversationId, response.id);


        return {
            id: response.id,
            message: response.output_text,
        }
    
    }
}
