"use client"

import * as React from "react"

import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

export const HomeSidebar: FC<{}> = () => {
    return (
        <div className="bg-primary-foreground min-w-[600px] h-full">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
        </div>
  )
}