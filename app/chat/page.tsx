"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Chat } from "@/components/chat-ui/chat"
import { NavBar } from "@/components/navbar"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { Card } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TabbedSidebar } from "@/components/tabbed-sidebar"
import { doc, setDoc, collection, getDocs, QuerySnapshot, DocumentData, CollectionReference, query } from "firebase/firestore";
import { EditIcon } from "@/components/icons/prompt-ed-icons"

interface ChatHistoryMessage {
  role: "system" | "user" | "assistant" | "error";
  content: string;
}

interface UserChat {
  chat : ChatHistoryMessage []
  date : string
}

export default function Home() {

  let inDate: string = "";
  const [logIn, setLogIn] = useState(true);
  const [userID, setUserID] = useState(auth.currentUser?.uid);
  const [userChats, setUserChats] = useState<DocumentData[]>([])
  const [loadedChat, setLoadedChat] = useState<ChatHistoryMessage[]>([])

  onAuthStateChanged(auth, (user) => {
    if (user && !logIn) {
      setLogIn(true);
    }
    if (user && typeof userID === 'undefined') {
      setUserID(user.uid);
    }
  });

  useEffect(()=>{
    
    const getUserChats = async (userId: string | undefined): Promise<void> => {
      const pathName = "users/" + userId + "/chats"
      const collectionRef = query(collection(db, pathName));
      const chats: DocumentData[] = [];
    
      try {
        const querySnapshot: QuerySnapshot = await getDocs(collectionRef);
    
        querySnapshot.forEach((doc) => {
          chats.unshift({ date: doc.id, chat : doc.data().messages.map((item:string) => JSON.parse(item))});
        });
      } catch (error) {
        console.error("Error getting documents:", error);
      }
      console.log(chats)
      setUserChats(chats)
    }

    getUserChats(auth.currentUser?.uid)

  },[userID])

  const updateUserMessages = (chat:UserChat)=>{
    setUserChats((oldArray)=>([chat, ...oldArray, ]))
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
  
    const formattedDate = date.toLocaleDateString('en-US', options);
    const day = date.getDate();
    const suffix = getDaySuffix(day);

    return formattedDate.replace(day.toString(), `${day}${suffix}`);
  }
  
  function getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  

  if (!logIn) {
    return (
      <p>Access Denied</p>
    );
  } else {
    return (
      <div className="flex flex-col h-screen">
        <NavBar navLocation="chat"/>
        <div className="flex flex-row h-[calc(100vh-90px)]">
          <TabbedSidebar noCard={true} tabs={[
            {name: "Chat History", content: // This content is only here as a reference for what this should look like once actually implemented
              <>
                <div className="w-full px-4 pt-[30px]">
                  <p className="text-title-xl font-bold text-white">
                      Chat History
                  </p>
                </div>
                <ScrollArea type="auto" className="max-h-[calc(100vh-348px)] w-full px-4">
                  {userChats.map((chat,key)=>(
                    <div className="mt-[30px] h-[92px] w-full border-b border-primary" key={key}>
                    <p className="text-[15px] text-primary">
                      {formatDate(chat.date)}
                    </p>
                    <div className="flex flex-row py-[18px]">
                      <p className="flex-1 text-lg text-white">
                      {chat.chat[0].content}
                      </p>
                      <Button onClick={(()=>{
                        setLoadedChat(chat.chat)
                      })} variant="accent" iconPosition="full" className="w-[30px] h-[28px]">
                        <EditIcon className="w-[16px] h-[16px] text-primary-foreground" />
                      </Button>
                    </div>
                  </div>
                  ))}
                </ScrollArea>
              </>},
            ]} defaultValue="Chat History" />
          <div className="flex flex-col items-center w-full px-12 py-6">
            <Card className="w-full h-full">
              {inDate === '' ? <Chat date={new Date().toString()}  updateUserMessages={updateUserMessages} loadedChat={loadedChat}/> : <div><Chat date={inDate} updateUserMessages={updateUserMessages} loadedChat={loadedChat}/></div>}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}