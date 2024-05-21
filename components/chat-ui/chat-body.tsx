
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import ChatBottombar from "./bottom";
import { AnimatePresence, motion } from "framer-motion";
import ScratchBlocks from "./scratch-blocks";

//chat ui elements from: https://github.com/jakobhoeg/shadcn-chat/tree/master under MIT License
interface ChatBodyProps {
  messages?: Message[];
  sendMessage: (newMessage: Message[]) => void;
  date: string
}

export function ChatBody({
  messages,
  sendMessage,
  date
}: ChatBodyProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
    console.log(messages)
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                !message.ai ? "items-end" : "items-start"
              )}
            >
            <div className="flex gap-3 items-center">
              <span className=" bg-accent p-3 rounded-md max-w-xs text-foreground">
                {message.message}
              </span>
            </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <ScratchBlocks code={`when flag clicked`}/>
      </div>
      
      <ChatBottombar sendMessage={sendMessage} date={date}/>
    </div>
  );
}