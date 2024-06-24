"use client"

import * as React from "react"

import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card } from "./ui/card";

export const TabbedSidebar: FC<{ tabs : { labelElement? : React.ReactNode, name : string, content : React.ReactNode }[], defaultValue : string }> = (props : { tabs : { labelElement? : React.ReactNode, name : string, content : React.ReactNode }[], defaultValue : string }) => {
    return (
        <div className="bg-primary-foreground min-w-[600px] h-full flex flex-col">
            <Tabs defaultValue={props.defaultValue} className="flex flex-col items-center w-full h-full pt-[30px] pb-10 px-10 space-y-[35px]">
                <TabsList className="w-full">
                    {props.tabs?.map((tab) => <TabsTrigger key={tab.name} value={tab.name}>{tab.labelElement ? tab.labelElement : tab.name}</TabsTrigger>)}
                </TabsList>
                {props.tabs?.map((tab) => <TabsContent key={tab.name} value={tab.name} className="h-full w-full">
                    <Card className="bg-primary pt-12 px-10 w-full h-full">
                        {tab.content}
                    </Card>
                </TabsContent>)}
            </Tabs>
            <div className="flex border-t border-t-white">

            </div>
            <div className="flex h-20">

            </div>
        </div>
  )
}