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

export function Chat({ messages, date }: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? []
  );

  const sendMessage = (newMessage: Message[]) => {
    setMessages([...messagesState, ...newMessage]);
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

  return (
      <div className="h-screen flex flex-col items-center justify-between w-full max-h-128">
        <ChatBody
            messages={messagesState}
            sendMessage={sendMessage}
            date = {date}
        />
        <div className="w-screen flex justify-center">
            <Button className="max-w-10 mr-10 mb-5" onClick={onSave}>Save Chat</Button>
            <Button className="max-w-10 mb-5" onClick={onClear}>Clear</Button>
        </div>
      </div>
  );
}