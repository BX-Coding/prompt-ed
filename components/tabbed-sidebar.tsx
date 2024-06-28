"use client"

import * as React from "react"

import { FC, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { LeftArrowIcon, RightArrowIcon, SettingsIcon } from "./icons/prompt-ed-icons";
import Image from "next/image";
import Link from "next/link";

export const TabbedSidebar: FC<{ tabs : { labelElement? : React.ReactNode, name : string, content : React.ReactNode }[], noCard? : boolean, defaultValue : string }> = (props : { tabs : { labelElement? : React.ReactNode, name : string, content : React.ReactNode }[], noCard? : boolean, defaultValue : string }) => {
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
                        {props.noCard ? tab.content : <Card className="bg-primary pt-12 px-10 w-full h-full">
                            {tab.content}
                        </Card>}
                    </TabsContent>)}
                </Tabs> : 
                <div className="flex flex-col items-center w-full h-full pt-[30px] pb-10 px-10 space-y-[35px]">
                    {props.noCard ? props.tabs[0].content : <Card className="bg-primary pt-12 px-10 w-full h-full">
                        {props.tabs[0].content}
                    </Card>}
                </div> }
                <div className="flex border-t border-t-white flex-none h-[81px] pt-5 px-[42px]">
                    <Link title="Account Settings" href="/account">
                        <Button variant="ghost" size="lg" className="items-start h-10 w-10 overflow-hidden rounded-lg p-0">
                            <Image width={40} height={40} alt="AI" objectFit="cover" src="/default-profile-icon.jpeg" />
                        </Button>
                    </Link>
                    <div className="flex-1" />
                    <Button title="Settings" variant="ghost" size="lg" className="items-start h-10 w-10 overflow-hidden rounded-lg p-0">
                        <SettingsIcon className="h-10 w-10 text-white" />
                    </Button>
                </div>
            </div>
            <Button size="lg" variant="accent" iconPosition="full" className={"absolute max-xl:top-[110px] xl:top-[200px] rounded-full w-9 h-9 px-0 " + (showSidebar ? " max-xl:left-[calc(100%-18px)] xl:left-[590px] " : " left-0 ")} onClick={toggleShowSidebar}>{showSidebar ? <LeftArrowIcon className="w-3 h-5 -ml-1 text-black" /> : <RightArrowIcon className="w-3 h-5 ml-1 text-black" />}</Button>
        </div>
    )
}