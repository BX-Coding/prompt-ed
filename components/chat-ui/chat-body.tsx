import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import ChatBottomBar from "./bottom";
import { AnimatePresence, motion } from "framer-motion";
import EmbeddedMessage from "./embedded-message";
import Script from "next/script";
import { ScrollArea } from "../ui/scroll-area";

//chat ui elements from: https://github.com/jakobhoeg/shadcn-chat/tree/master under MIT License
interface ChatBodyProps {
  messages: ChatHistoryMessage[];
  sendMessage: (newMessage: ChatHistoryMessage) => void;
  date: string
  errorLastPrompt: () => void;
}

interface ChatHistoryMessage {
  role: "system" | "user" | "assistant" | "error";
  content: string;
}

export function ChatBody({
  messages,
  sendMessage,
  errorLastPrompt
}: ChatBodyProps) {
  const [scratchBlocksReady, setScratchBlocksReady] = React.useState<boolean>(false)
  const [chatHasScratch, setChatHasScratch] = React.useState<boolean>(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
    console.log(messages);

    // Check if chat has a history of scratch, if true will render out code that it sees in scratch.
    if(!chatHasScratch && messages.length>0){
      if(messages[messages.length-1].content.toLowerCase().includes("scratch")){
        setChatHasScratch(true)
      }
    }
    console.log("Conversation has Scratch mentioned", chatHasScratch)

  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <Script src="https://scratchblocks.github.io/js/scratchblocks-v3.6.4-min.js"
        onLoad={()=>{
          setScratchBlocksReady(true)
        }}
        />
      <ScrollArea colorScheme="blue" type="auto" className="h-full w-full px-6">
        <div
          ref={messagesContainerRef}
          className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-1 flex-col"
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
                  message.role==="assistant" ? "items-start" : "items-end"
                )}
              >
              <div className="flex gap-3 items-center">
                <span className={cn("p-3 rounded-md max-w-xs text-foreground", message.role === "error" ? "bg-red-400" : "bg-accent")}>
                  {message.content.toLowerCase().includes("scratch") || chatHasScratch ? (
                    <EmbeddedMessage llmResponse={message.content} scratchBlocksReady={scratchBlocksReady}/>
                  ) : (
                    <>{message.content}</>
                  )}
                </span>
              </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
      <ChatBottomBar messages={messages} sendMessage={sendMessage} errorLastPrompt={errorLastPrompt}/>
    </div>
  );
}
