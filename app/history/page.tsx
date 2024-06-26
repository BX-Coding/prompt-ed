"use client"

import { NavBar } from "@/components/navbar"
import { onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
        <div className="h-screen">
            <div className="flex mb-2 justify-between">
            <h3 className="text-xl text-start font-bold ml-2 mt-2 text-muted">Prompt-Ed</h3>
            <NavBar/>
            </div>
            <div className="flex flex-row w-screen">
            <Card className="w-full ml-5 mb-5 mr-5 h-max">
            <CardHeader>
                <CardTitle>Chat History</CardTitle>
                <CardDescription>Click on a chat to reopen it</CardDescription>
            </CardHeader>
            <CardContent>
                <ChatHistoryBox/>
            </CardContent>
            </Card>
            <Card className="w-full mb-5 mr-5 h-max">
            <CardHeader>
                <CardTitle>Image History</CardTitle>
                <CardDescription>Click on an image to reopen it</CardDescription>
            </CardHeader>
            <CardContent>
                nothing
            </CardContent>
            </Card>
            </div>
        </div>
        );
    }
}