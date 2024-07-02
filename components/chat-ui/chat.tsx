import { auth, db } from "@/app/firebase";
import { Button } from "../ui/button";
import { ChatBody } from "./chat-body";
import React, { useEffect, useState } from "react";
import { doc, setDoc, collection, getDocs, QuerySnapshot, DocumentData, CollectionReference, query } from "firebase/firestore";

//chat ui elements from: https://github.com/jakobhoeg/shadcn-chat/tree/master under MIT License
interface ChatProps {
  date: string
  updateUserMessages: (chat:UserChat) => void;
}

interface UserChat {
  chat : ChatHistoryMessage []
  date : string
}

interface ChatHistoryMessage {
  role: "system" | "user" | "assistant" | "error";
  content: string;
}

export function Chat({ date, updateUserMessages }: ChatProps) {
  const [messagesState, setMessages] = useState<ChatHistoryMessage[]>([]);

  const sendMessage = (newMessage: ChatHistoryMessage) => {
    setMessages((prevArray)=>[...prevArray, newMessage]);
  };

  const onSave = async () => {
    if(messagesState.length>0){
      const pathName = "/users/" + auth.currentUser?.uid + "/chats";
      let messageArr: string[] = [];
      messagesState?.forEach((message) => {
          messageArr = [...messageArr, JSON.stringify(message)];
      })
      console.log(pathName);
      console.log(messageArr);
      const dateStr = date.toString();
      await setDoc(doc(db, pathName, dateStr), {
        messages: messageArr
      });

      updateUserMessages({date:dateStr,chat:messagesState})
    }
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
            onSave={onSave}
            onClear={onClear}
        />
      </div>
  );
}