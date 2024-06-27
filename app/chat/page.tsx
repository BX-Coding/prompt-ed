"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Chat } from "@/components/chat-ui/chat"
import { NavBar } from "@/components/navbar"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { Card } from "@/components/ui/card"
import { doc, getDoc } from "firebase/firestore"
import { useSearchParams } from "next/navigation"
import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TabbedSidebar } from "@/components/tabbed-sidebar"

export default function Home() {


  let inDate: string = "";
  const searchParams = useSearchParams();
  const str = searchParams.get('date');
  const [logIn, setLogIn] = useState(true);
  const [userID, setUserID] = useState(auth.currentUser?.uid);
  const [messages, setMessages] = React.useState<Message[]>([]);
    onAuthStateChanged(auth, (user) => {
      if (user && !logIn) {
        setLogIn(true);
      }
      if (user && typeof userID === 'undefined') {
        setUserID(user.uid);
      }
    });
  const date = new Date();
  if (typeof str === 'string') {
    inDate = str;
  }
  // let messages: Message[] = [];
  useEffect(() => {
    const getChatsFromDate = async () => {
      let placeholder: Message[] = [];
      const pathname = "users/" + userID + "/chats";
      try {
        const docRef = doc(db, pathname, inDate);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          let docDate = docSnap.data();
          docDate.messages.forEach((el: string) => {
            placeholder = [...placeholder, JSON.parse(el)];
          });
        } else {
          // docSnap.data() will be undefined in this case
          console.log(pathname);
          console.log("No such document!");
        }
        setMessages([...messages, ...placeholder]);
      } catch {
        console.log("not valide document reference");
      }
    }
    getChatsFromDate();

  }, [userID, inDate]);

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
                  <div className="h-[92px] w-full border-b border-primary">
                    <p className="text-[15px] text-primary">
                      June 3
                    </p>
                    <div className="flex flex-row py-[18px]">
                      <p className="flex-1 text-lg text-white">
                        Title of prompt created
                      </p>
                      <Button variant="accent"></Button>
                    </div>
                  </div>
                  <div className="mt-[30px] h-[92px] w-full border-b border-primary">
                    <p className="text-[15px] text-primary">
                      June 3
                    </p>
                    <div className="flex flex-row py-[18px]">
                      <p className="flex-1 text-lg text-white">
                        Title of prompt created
                      </p>
                      <Button variant="accent"></Button>
                    </div>
                  </div>
                  <div className="mt-[30px] h-[92px] w-full border-b border-primary">
                    <p className="text-[15px] text-primary">
                      June 3
                    </p>
                    <div className="flex flex-row py-[18px]">
                      <p className="flex-1 text-lg text-white">
                        Title of prompt created
                      </p>
                      <Button variant="accent"></Button>
                    </div>
                  </div>
                  <div className="mt-[30px] h-[92px] w-full border-b border-primary">
                    <p className="text-[15px] text-primary">
                      June 3
                    </p>
                    <div className="flex flex-row py-[18px]">
                      <p className="flex-1 text-lg text-white">
                        Title of prompt created
                      </p>
                      <Button variant="accent"></Button>
                    </div>
                  </div>
                  <div className="mt-[30px] h-[92px] w-full border-b border-primary">
                    <p className="text-[15px] text-primary">
                      June 3
                    </p>
                    <div className="flex flex-row py-[18px]">
                      <p className="flex-1 text-lg text-white">
                        Title of prompt created
                      </p>
                      <Button variant="accent"></Button>
                    </div>
                  </div>
                  <div className="mt-[30px] h-[92px] w-full border-b border-primary">
                    <p className="text-[15px] text-primary">
                      June 3
                    </p>
                    <div className="flex flex-row py-[18px]">
                      <p className="flex-1 text-lg text-white">
                        Title of prompt created
                      </p>
                      <Button variant="accent"></Button>
                    </div>
                  </div>
                  <div className="mt-[30px] h-[92px] w-full border-b border-primary">
                    <p className="text-[15px] text-primary">
                      June 3
                    </p>
                    <div className="flex flex-row py-[18px]">
                      <p className="flex-1 text-lg text-white">
                        Title of prompt created
                      </p>
                      <Button variant="accent"></Button>
                    </div>
                  </div>
                </ScrollArea>
              </>},
            ]} defaultValue="Chat History" />
          <div className="flex flex-col items-center w-full px-12 py-6">
            <Card className="w-full h-full">
              {inDate === '' ? <Chat date={new Date().toString()}/> : <div key={messages.length}><Chat date={inDate} messages={messages}/></div>}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}