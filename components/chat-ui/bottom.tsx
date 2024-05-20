import {
    SendHorizontal
  } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

//chat ui elements from: https://github.com/jakobhoeg/shadcn-chat/tree/master under MIT License
interface ChatBottombarProps {
  sendMessage: (newMessage: Message[]) => void;
  date: string
}

/**
 * TO ADD AI FUNCTIONALITY: add AI generation to the generareAIMessage method.
 * Use prompt parameter as the user's input. Leave ai to true but assign
 * message to the desired AI content
 */
export default function ChatBottombar({
  sendMessage,
  date
}: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const [waiting, setWaiting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  //TODO: REPLACE THIS METHOD WITH GENERATING AI MESSAGES
  const generateAIMessage = async(prompt: string) => {
    const aiMessage: Message = {
      message: "replace this with AI content",
      ai: true
    } 
    console.log(prompt);
    return aiMessage
  }

  const handleSend = async () => {
    if (message.trim()) {
      setWaiting(true);
      const personMessage: Message = {
          message: message,
          ai: false
      }
      console.log(personMessage.message)
      let messages = [personMessage];
      sendMessage(messages);
      //do AI stuff
      const generateMessage = await generateAIMessage(message);
      messages = [...messages, generateMessage];
      sendMessage(messages);
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
          >
          </Link>
        )}
    </div>
  );
}