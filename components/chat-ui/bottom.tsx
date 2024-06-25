import { SendHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/app/firebase";

//chat ui elements from: https://github.com/jakobhoeg/shadcn-chat/tree/master under MIT License
interface ChatBottombarProps {
  messages: ChatHistoryMessage[];
  sendMessage: (newMessage: ChatHistoryMessage) => void;
  errorLastPrompt: () => void;
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
export default function ChatBottombar({
  sendMessage,
  messages,
  errorLastPrompt
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
    if (message.trim()) {
      setWaiting(true);
      //do AI stuff
      await generateAIMessage(message);
      setWaiting(false);
      setMessage("");
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
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <Input
        autoComplete="off"
        value={message}
        ref={inputRef}
        onKeyDown={(e) => handleKeyPress(e)}
        onChange={(e) => handleInputChange(e)}
        name="message"
        placeholder="Aa"
        className=" h-9 w-full flex items-center resize-none overflow-hidden text-foreground"
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
    </div>
  );
}
