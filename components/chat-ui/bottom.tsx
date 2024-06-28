import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/app/firebase";
import { SendIcon, StarUnfilledIcon } from "../icons/prompt-ed-icons";
import { RotateCcwIcon } from "lucide-react";

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
    <div className="flex w-full items-center gap-2 mb-8">
      <Input
        autoComplete="off"
        value={message}
        ref={inputRef}
        onKeyDown={(e) => handleKeyPress(e)}
        onChange={(e) => handleInputChange(e)}
        name="message"
        placeholder="Type your message here..."
        className="items-center resize-none overflow-hidden pr-16"
        inputSize="xl"
      ></Input>
      <div className="relative -ml-2">
        <div className="absolute right-[21px] -bottom-[18px]">
          <Button title="Send" variant="ghost" size="icon" className={message.trim() && !waiting ? "" : "opacity-50"} onClick={handleSend}>
            <SendIcon className="w-6 h-6 text-accent" />
          </Button>
        </div>
      </div>
      <Button title="Save Chat" variant="ghost" iconPosition="full" onClick={onSave}><StarUnfilledIcon className="w-6 h-6 text-accent" /></Button>
      <Button title="Clear" variant="ghost" iconPosition="full" onClick={onClear}><RotateCcwIcon className="w-6 h-6 text-accent" /></Button>
    </div>
  );
}
