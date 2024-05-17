"use client"

import Link from "next/link"
import { UserAuthForm } from "../../components/login-form"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Chat } from "@/components/chat-ui/chat"
import { NavBar } from "@/components/navbar"
import { onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { auth, db } from "../firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { doc, getDoc } from "firebase/firestore"

export default function Home(inDate: string) {


  const [logIn, setLogIn] = useState(true);
    onAuthStateChanged(auth, (user) => {
      if (user && !logIn) {
        setLogIn(true);
      }
    });
  const date = new Date();
  let messages: Message[] = [];
  const getChatsFromDate = async () => {
    const pathname = "users/" + auth.currentUser?.uid + "/chats";
    const docRef = doc(db, pathname, inDate);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      let docDate = docSnap.data();
      docDate.forEach((el: string) => {
        messages = [...messages, JSON.parse(el)];
      });
      return messages;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return [];
    }
  }

  if (!logIn) {
    return (
      <p>Access Denied</p>
    );
  } else {
    return (
      <>
        <div className="flex mb-2 justify-between">
          <h3 className="text-xl text-start font-bold ml-2 mt-2 text-muted">Prompt-Ed</h3>
          <NavBar/>
        </div>
        <Card className="w-100 h-screen">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
            <CardDescription suppressHydrationWarning>{date.toString()}</CardDescription>
          </CardHeader>
          <CardContent>
            {inDate === '' ? <Chat date={new Date()}/> : <Chat date={new Date(inDate)} messages={messages}/>}
          </CardContent>
          </Card>
      </>
    );
  }
}