"use client"

import * as React from "react"

import { FC, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export const TabbedSidebar: FC<{ tabs : { labelElement? : React.ReactNode, name : string, content : React.ReactNode }[], defaultValue : string }> = (props : { tabs : { labelElement? : React.ReactNode, name : string, content : React.ReactNode }[], defaultValue : string }) => {
    const [showSidebar, setShowSidebar] = useState(true);

    const toggleShowSidebar = () => {
        setShowSidebar(!showSidebar);
    }
    
    return (
        <div className={"z-50 bg-primary-foreground flex flex-col h-[calc(100vh-90px)] max-xl:absolute max-xl:top-[90px] max-xl:left-0 " + (showSidebar ? " max-xl:w-[calc(100%-20px)] xl:w-[600px] " : " w-5 ")}>
            <div className={"min-w-[600px] h-full w-full flex flex-col" + (showSidebar ? "" : " hidden ")}>
                { props.tabs.length > 1 ?
                <Tabs defaultValue={props.defaultValue} className="flex flex-col items-center w-full h-full pt-[30px] pb-10 px-10 space-y-[35px]">
                    <TabsList className="w-full">
                        {props.tabs?.map((tab) => <TabsTrigger key={tab.name} value={tab.name}>{tab.labelElement ? tab.labelElement : tab.name}</TabsTrigger>)}
                    </TabsList>
                    {props.tabs?.map((tab) => <TabsContent key={tab.name} value={tab.name} className="h-full w-full">
                        <Card className="bg-primary pt-12 px-10 w-full h-full">
                            {tab.content}
                        </Card>
                    </TabsContent>)}
                </Tabs> : 
                <div className="flex flex-col items-center w-full h-full pt-[30px] pb-10 px-10 space-y-[35px]">
                    <Card className="bg-primary pt-12 px-10 w-full h-full">
                        {props.tabs[0].content}
                    </Card>
                </div> }
                <div className="flex border-t border-t-white">

                </div>
                <div className="flex h-20">

                </div>
            </div>
            <Button size="sm" variant="accent" className={"absolute top-[200px] rounded-full " + (showSidebar ? " max-xl:left-[calc(100%-10px)] xl:left-[590px] " : " left-0 ")} onClick={toggleShowSidebar}>{showSidebar ? <>&lt;</> : <>&gt;</>}</Button>
        </div>
    )
}