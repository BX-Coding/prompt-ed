"use client"

import * as React from "react"

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { format } from "url";
import { Button } from "./ui/button";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import path from "path";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";
// import { AlertDelete } from "./delete-history-alert";

interface ChatHistoryProps {
    date: string
}

export function ChatHistory({date} : ChatHistoryProps) {
    const [deleted, setDeleted] = useState(false);
    const router = useRouter();
    const onDelete = async () => {
        const pathname = "users/" + auth.currentUser?.uid + "/chats";
        await deleteDoc(doc(db, pathname, date));
        setDeleted(true);
    }

    return (<>
        {deleted ? (<></>) : (
            <Card>
                <CardHeader>
                    <div className="flex">
                    <Link
                        href={{
                            pathname: '/chat',
                            query: {date: date} // the data
                        }}>
                        <CardTitle>{date}</CardTitle>
                    </Link>
                    <Button onClick={onDelete} variant={"destructive"}>Delete</Button>
                    </div>
                </CardHeader>
            </Card>)}
    </>
    );
}