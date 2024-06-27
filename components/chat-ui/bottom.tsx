import { SendHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/app/firebase";

//chat ui elements from: https://github.com/jakobhoeg/shadcn-chat/tree/master under MIT License
interface ChatBottombarProps {
  messages: ChatHistoryMessage[];
  sendMessage: (newMessage: ChatHistoryMessage) => void;
  errorLastPrompt: () => void;
  onSave: () => void;
  onClear: () => void;
}

interface ChatHistoryMessage {
  role: "system" | "user" | "assistant" | "error";
  content: string;
}

/**
 * TO ADD AI FUNCTIONALITY: add AI generation to the generareAIMessage method.
 * Use prompt parameter as the user's input. Leave ai to true but assign
 * message to the desired AI content
 */
export default function ChatBottomBar({
  sendMessage,
  messages,
  errorLastPrompt,
  onSave,
  onClear
}: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const [waiting, setWaiting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const generateChat = httpsCallable(functions, "createChat");

  //TODO: REPLACE THIS METHOD WITH GENERATING AI MESSAGES
  const generateAIMessage = async (prompt: string) => {

    const tempMessages:ChatHistoryMessage[] = [...messages];
    tempMessages.push({ role: "user", content: prompt })

    sendMessage({ role: "user", content: prompt })
    try {
      const response = await generateChat({ messages:tempMessages.filter(message => message.role !== "error")});
      const aiMessage = String(response.data);

      sendMessage({ role: "assistant", content: aiMessage })

    } catch (error) {
      console.error("Error generating AI message:", error);
      errorLastPrompt()
      sendMessage({ role: "error", content: "Error generating response! Negative flags may have been detected in your prompt. Please try again." })
    }
  };

  const handleSend = async () => {
    const message_ref = message;
    if (message_ref.trim()) {
      setWaiting(true);
      setMessage("");
      //do AI stuff
      await generateAIMessage(message_ref);
      setWaiting(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="flex justify-between w-full items-center gap-2">
      <Input
        autoComplete="off"
        value={message}
        ref={inputRef}
        onKeyDown={(e) => handleKeyPress(e)}
        onChange={(e) => handleInputChange(e)}
        name="message"
        placeholder="Type your message here..."
        className="items-center resize-none overflow-hidden"
        inputSize="xl"
      ></Input>

      {message.trim() && !waiting ? (
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-9 w-9",
            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
          )}
          onClick={handleSend}
        >
          <SendHorizontal size={20} className="text-foreground" />
        </Link>
      ) : (
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-9 w-9",
            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
          )}
        ></Link>
      )}
      <div className="flex">
        <Button className="max-w-10 mr-10 mb-5" onClick={onSave}>Save Chat</Button>
        <Button className="max-w-10 mb-5" onClick={onClear}>Clear</Button>
        </div>
    </div>
  );
}
