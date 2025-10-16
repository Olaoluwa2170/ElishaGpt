import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ChatInput, { type ChatFormData } from "./ChatInput";
import type { MessageType } from "./ChatMessages";
import ChatMessages from "./ChatMessages";
import { TypingIndicator } from "./TypingIndicator";
import popSound from "@/assets/sounds/pop.mp3";
import notificationSound from "@/assets/sounds/notification.mp3";

const popAudio = new Audio(popSound);
const notificationAudio = new Audio(notificationSound);

popAudio.volume = 0.2;
notificationAudio.volume = 0.2;

type ChatResponse = {
  message: string;
};

const ChatBox = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState("");
  const conversationId = useRef<string>(crypto.randomUUID());
  const aiCount = localStorage.getItem("aiUsageCount")
  const [aiUsageCount, setAiUsageCount] = useState(aiCount ? parseInt(aiCount) : 0);

  useEffect(() => {
    localStorage.setItem("aiUsageCount", "0");
  }, []);

  const onSubmit = async (data: ChatFormData) => {
    try {
      const { prompt } = data;
      setError("");
      setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
      popAudio.play();

      setIsBotTyping(true);
      if (aiUsageCount >= 3) {
        setError("AI usage limit reached");
        setIsBotTyping(false);
        return;
      }
      const response = await axios.post<ChatResponse>("/api/chat", {
        prompt,
        conversationId: conversationId.current,
      });
      setMessages((prev) => [
        ...prev,
        { content: response.data.message, role: "bot" },
      ]);
      notificationAudio.play();
      setAiUsageCount((prev) => {
        const newCount = prev + 1;
        localStorage.setItem("aiUsageCount", newCount.toString());
        return newCount;
      });
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-2 mb-8 flex-1 overflow-y-auto">
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {error && <p className="text-red-500 my-2">{error}</p>}
      </div>

      <ChatInput onSubmit={onSubmit} />
    </div>
  );
};

export default ChatBox;
