"use client"

import * as React from "react"

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { format } from "url";

interface ChatHistoryProps {
    date: Date
}

export function ChatHistory({date} : ChatHistoryProps) {
    const router = useRouter();

    const handleClick = () => {
        const url = format({
            pathname: '/chats',
            query: { date: date.toString() },
         });
        router.push(url);
    }
    return (
        <>
            <Card onClick={handleClick}>
                <CardHeader>
                    <CardTitle>{date.toString()}</CardTitle>
                </CardHeader>
            </Card>
        </>
    )
}