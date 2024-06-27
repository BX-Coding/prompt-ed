import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import ChatBottomBar from "./bottom";
import { AnimatePresence, motion } from "framer-motion";
import EmbeddedMessage from "./embedded-message";
import Script from "next/script";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { CopyIcon, PenSquareIcon, RepeatIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";

//chat ui elements from: https://github.com/jakobhoeg/shadcn-chat/tree/master under MIT License
interface ChatBodyProps {
  messages: ChatHistoryMessage[];
  sendMessage: (newMessage: ChatHistoryMessage) => void;
  date: string;
  errorLastPrompt: () => void;
  onSave: () => void;
  onClear: () => void;
}

interface ChatHistoryMessage {
  role: "system" | "user" | "assistant" | "error";
  content: string;
}

export function ChatBody({
  messages,
  sendMessage,
  errorLastPrompt,
  onSave,
  onClear
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

  const messageContent = (message: ChatHistoryMessage) => (
    <>
      {message.content.toLowerCase().includes("scratch") || chatHasScratch ? (
        <EmbeddedMessage llmResponse={message.content} scratchBlocksReady={scratchBlocksReady}/>
      ) : (
        <p className="text-chat text-text-p1">{message.content}</p>
      )}
    </>
  )

  const handleCopy = (message: ChatHistoryMessage) => {
    navigator.clipboard.writeText(message.content);
  }

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <Script src="https://scratchblocks.github.io/js/scratchblocks-v3.6.4-min.js"
        onLoad={()=>{
          setScratchBlocksReady(true)
        }}
        />
      <ScrollArea colorScheme="blue" type="auto" className="h-full w-full px-[18px] pb-2">
        <div className="h-9" />
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
                  "flex flex-col gap-2 whitespace-pre-wrap",
                  "items-stretch w-full"
                )}
              >
              <div className="flex items-stretch w-full">
                {message.role==="assistant" ? 
                <div className="p-5 rounded-xl text-foreground w-full bg-card-solid mb-5 border shadow-[0_0_1px_rgba(0,0,0,0.05)]">
                  <div className="flex flex-row w-full h-9 mb-4">
                    <Image width={36} height={36} alt="AI" src="/chat-ai-icon.svg" />
                    <div className="flex flex-1" />
                    <Button className="text-[13px] text-text-p1" variant="outline" onClick={() => handleCopy(message)}><CopyIcon className="ml-[-4px] mr-1 h-[15px] w-[15px]" color="var(--secondary)" />Copy</Button>
                  </div>
                  {messageContent(message)}
                  <div className="flex flex-row w-full mt-4 gap-3">
                    <Button className="text-[13px] text-text-p1" variant="outline"><RepeatIcon className="ml-[-4px] mr-1 h-[15px] w-[15px]" color="var(--secondary)" />Regenerate</Button>
                    <div className="flex flex-1" />
                    <Button variant="outline"><ThumbsDownIcon className="mx-[-8px] h-[20px] w-[20px]" color="var(--secondary)" /></Button>
                    <Button variant="outline"><ThumbsUpIcon className="mx-[-8px] h-[20px] w-[20px]" color="var(--secondary)" /></Button>
                  </div>
                </div>
                   : 
                <div className={cn("p-5 rounded-xl space-x-2.5 items-center w-full mb-5 flex flex-row border shadow-[0_0_1px_rgba(0,0,0,0.05)]", message.role === "error" ? "bg-red-400" : "bg-primary")}>
                  <div className="overflow-hidden flex-none w-10 h-10 rounded-lg">
                    <Image width={40} height={40} alt="AI" objectFit="cover" className="" src="/default-profile-icon.jpeg" />
                  </div>
                  {messageContent(message)}
                  <div className="flex flex-1" />
                  <Button variant="accent"><PenSquareIcon className="mx-[-8px] h-[20px] w-[20px]" color="var(--primary)" /></Button>
                </div>}
              </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
      <div className=" px-[18px]">
        <ChatBottomBar messages={messages} sendMessage={sendMessage} errorLastPrompt={errorLastPrompt} onSave={onSave} onClear={onClear} />
      </div>
    </div>
  );
}
