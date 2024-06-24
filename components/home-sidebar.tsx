"use client"

import * as React from "react"

import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card } from "./ui/card";

export const HomeSidebar: FC<{}> = () => {
    return (
        <div className="bg-primary-foreground min-w-[600px] h-full flex flex-col">
            <Tabs defaultValue="Lesson1" className="flex flex-col items-center w-full h-full pt-[30px] pb-10 px-10 space-y-[35px]">
                <TabsList className="w-full">
                    <TabsTrigger value="Lesson1">Lesson 1</TabsTrigger>
                    <TabsTrigger value="Lesson2">Lesson 2</TabsTrigger>
                    <TabsTrigger value="Lesson3">Lesson 3</TabsTrigger>
                    <TabsTrigger value="Lesson4">Lesson 4</TabsTrigger>
                    <TabsTrigger value="Lesson5">Lesson 5</TabsTrigger>
                </TabsList>
                <TabsContent value="Lesson1" className="flex flex-1 w-full">
                    <Card className="bg-primary pt-12 px-10 w-full h-full">
                        <p className="text-xl font-bold">
                            Welcome to Neural Kingdom
                        </p>
                    </Card>
                </TabsContent>
                <TabsContent value="Lesson2" className="flex flex-col w-full">
                    <Card>

                    </Card>
                </TabsContent>
            </Tabs>
            <div className="flex border-t border-t-white">

            </div>
            <div className="flex h-20">

            </div>
        </div>
  )
}