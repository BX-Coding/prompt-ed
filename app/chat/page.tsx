"use client"

import Link from "next/link"
import { UserAuthForm } from "../../components/login-form"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Chat } from "@/components/chat-ui/chat"
import { NavBar } from "@/components/navbar"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { doc, getDoc } from "firebase/firestore"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"

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
      <div className="h-screen">
        <div className="flex mb-2 justify-between">
          <h3 className="text-xl text-start font-bold ml-2 mt-2 text-muted">Prompt-Ed</h3>
          <NavBar/>
        </div>
        <Card className="h-max ml-5 mr-5">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
            <CardDescription suppressHydrationWarning>{inDate === '' ? date.toString() : inDate}</CardDescription>
          </CardHeader>
          <CardContent>
            {inDate === '' ? <Chat date={new Date().toString()}/> : <div key={messages.length}><Chat date={inDate} messages={messages}/></div>}
          </CardContent>
          </Card>
      </div>
    );
  }
}