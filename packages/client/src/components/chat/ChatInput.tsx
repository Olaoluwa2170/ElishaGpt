import { ArrowUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

export type ChatFormData = {
  prompt: string;
};

type Props = {
  onSubmit: (data: ChatFormData) => Promise<void>;
};

const ChatInput = ({ onSubmit }: Props) => {
  const form = useForm<ChatFormData>();

  const handleSubmit = form.handleSubmit((data: ChatFormData) => {
    form.reset({ prompt: "" });
    onSubmit(data);
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-end gap-2 border-2 border-gray-200 rounded-xl p-4 min-h-[150px]"
    >
      <textarea
        {...form.register("prompt", {
          required: true,
          validate: (data) => data.trim().length > 0,
        })}
        autoFocus
        onKeyDown={handleKeyDown}
        name="prompt"
        id="prompt"
        maxLength={100}
        className="w-full flex-1 border-none focus:outline-none resize-none h-full"
        placeholder="Type your message"
      />
      <Button
        className="w-9 h-9 rounded-full cursor-pointer"
        disabled={!form.formState.isValid}
      >
        <ArrowUp />
      </Button>
    </form>
  );
};

export default ChatInput;
