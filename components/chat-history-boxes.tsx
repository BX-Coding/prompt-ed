import * as React from "react"

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { format } from "url";
import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { ChatHistory } from "./chat-history";


export function ChatHistoryBox() {
    const [dates, setDates] = React.useState<string[]>([]);;


    const pathname = "users/" + auth.currentUser?.uid +"/chats";
    const q = query(collection(db, pathname));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        setDates([...dates, doc.id]);
    });

    console.log(dates);
    let dateEls = dates.map((date) => <ChatHistory date={new Date(date)}/>);

    return (
        <>
            {dateEls}
        </>
    )
}