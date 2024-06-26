import { auth, db } from "@/app/firebase";
import { Button } from "../ui/button";
import { ChatBody } from "./chat-body";
import React from "react";
import { doc, setDoc } from "firebase/firestore";

//chat ui elements from: https://github.com/jakobhoeg/shadcn-chat/tree/master under MIT License
interface ChatProps {
  messages?: Message[];
  date: string
}

interface ChatHistoryMessage {
  role: "system" | "user" | "assistant" | "error";
  content: string;
}

export function Chat({ date }: ChatProps) {
  const [messagesState, setMessages] = React.useState<ChatHistoryMessage[]>([]);

  const sendMessage = (newMessage: ChatHistoryMessage) => {
    setMessages((prevArray)=>[...prevArray, newMessage]);
  };

  const onSave = async () => {
    const pathName = "/users/" + auth.currentUser?.uid + "/chats";
    let messageArr: string[] = [];
    messagesState?.forEach((message) => {
        messageArr = [...messageArr, JSON.stringify(message)];
    })
    console.log(pathName);
    console.log(messageArr);
    const dateStr = date.toString();
    const docRef = await setDoc(doc(db, pathName, dateStr), {
        messages: messageArr
    });
  }

  const onClear = () => {
    setMessages([]);
  }

  const errorLastPrompt = () => {
    setMessages((prevChatHistory) => {
      const newChatHistory = [...prevChatHistory];

      if (newChatHistory.length > 0) {
        const lastMessageIndex = newChatHistory.length - 1;
        newChatHistory[lastMessageIndex] = {
          ...newChatHistory[lastMessageIndex],
          role: "error"
        };
      }

      return newChatHistory;
    });
  };

  return (
      <div className="h-full flex flex-col items-center justify-between w-full">
        <ChatBody
            messages={messagesState}
            sendMessage={sendMessage}
            date = {date}
            errorLastPrompt = {errorLastPrompt}
        />
        <div className="w-full flex justify-center">
            <Button className="max-w-10 mr-10 mb-5" onClick={onSave}>Save Chat</Button>
            <Button className="max-w-10 mb-5" onClick={onClear}>Clear</Button>
        </div>
      </div>
  );
}