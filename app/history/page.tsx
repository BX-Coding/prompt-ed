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
import { ChatHistory } from "@/components/chat-history"
import { collection, getDocs, query } from "firebase/firestore"
import { ChatHistoryBox } from "@/components/chat-history-boxes"

export default function Home() {


    const [logIn, setLogIn] = useState(true);

    onAuthStateChanged(auth, (user) => {
        if (user && !logIn) {
        setLogIn(true);
        }
    });

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
            <Card className="w-50 h-screen">
            <CardHeader>
                <CardTitle>Chat History</CardTitle>
                <CardDescription>Click on a chat to reopen it</CardDescription>
            </CardHeader>
            <CardContent>
                <ChatHistoryBox/>
            </CardContent>
            </Card>
        </>
        );
    }
}