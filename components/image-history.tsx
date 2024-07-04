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

interface ImageHistoryProps {
    date: string
    prompt: string | undefined
    url : string
}

export function ImageHistory({date, prompt, url} : ImageHistoryProps) {
    const [deleted, setDeleted] = useState(false);
    const router = useRouter();
    const onDelete = async () => {
        const pathname = "users/" + auth.currentUser?.uid + "/chats";
        await deleteDoc(doc(db, pathname, date));
        setDeleted(true);
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


    return (<>
        {deleted ? (<></>) : (
            <Card>
                <CardHeader>
                        <div>
                            <Link
                                href={{
                                    pathname: '/image-gen',
                                    query: {date: date}
                                }}>
                                <CardTitle>{prompt}</CardTitle>
                            </Link>
                            <small>{formatDate(date)}</small>
                            <div className="pt-1"></div>
                            <img src={url}></img>
                            <div className="pt-2"></div>
                            <Button onClick={onDelete} variant={"destructive"}>Delete</Button>
                        </div>
                </CardHeader>
            </Card>)}
    </>
    );
}