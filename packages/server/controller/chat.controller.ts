import { z } from "zod";
import type { Request, Response } from "express";
import { chatService } from "../service/chat.service";
// Implementation detail
const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "Prompt is required")
    .max(100, "Prompt is too long"),
  conversationId: z.uuid("Invalid uuid"),
});

export const chatController = {
  sendMessage: async (req: Request, res: Response) => {
    const validateChat = chatSchema.safeParse(req.body);

    if (!validateChat.success) {
      return res.status(400).json({ error: validateChat.error });
    }
    try {
      const { prompt, conversationId } = req.body;
      const response = await chatService.sendMessage(prompt, conversationId);
      res.json({ message: response.message });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to generate a response." });
    }
  },
};
