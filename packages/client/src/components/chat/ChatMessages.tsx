import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export type MessageType = {
  content: string;
  role: "user" | "bot";
};

type ChatMessagesProps = {
  messages: MessageType[];
};

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const onCopyMessage = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message, index) => (
        <div
          key={message.content}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          className={cn("text-sm p-2 px-4 rounded-xl max-w-md whitespace-pre-wrap", {
            "bg-blue-500 text-white self-end": message.role === "user",
            "bg-gray-200 text-black self-start": message.role === "bot",
          })}
          onCopy={onCopyMessage}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
