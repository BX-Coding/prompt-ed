"use client"

import * as React from "react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Switch } from "./ui/switch";

/**
 * WARNING: This file contains untested code - namely Firebase storage code and fetching
 * You will more than likely experience a CORS error with current fetching. next.config
 * will need to be adjusted to allow the server to fetch an image from a remote domain (probably openai).
 * Otherwise, default security will prevent the image urls to load and you will get errors.
 * Please update next.config as appropriate when generative AI features are later added.
 * 
 * In order to add neceassry AI capabilities: change firebaseFunctionUrl variable and uncomment
 * the const urls and setImageURL in the submitHandler function.
 */
export const UITestingGround: React.FC = ({}) => {
    return (
        <>
        <div className="flex flex-1 flex-row justify-start bg-[#F7F7F7]">
            <div className="flex flex-initial w-150 bg-primary-foreground text-primary">
                test
            </div>
            <div className="p-4 flex-initial space-y-4">
                <Input className="w-64" disabled={true} type="text" placeholder="Inputs" />
                <Input type="text" placeholder="Inputs" />
                <div className="flex flex-row space-x-2">
                    <Button size="sm" disabled={true}>Button</Button>
                    <Button size="sm" disabled={true} variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="sm">Button</Button>
                    <Button size="sm" variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="default" disabled={true}>Button</Button>
                    <Button size="default" disabled={true} variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="default">Button</Button>
                    <Button size="default" variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="lg" disabled={true}>Button</Button>
                    <Button size="lg" disabled={true} variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="lg">Button</Button>
                    <Button size="lg" variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="xl" disabled={true}>Button</Button>
                    <Button size="xl" disabled={true} variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="xl">Button</Button>
                    <Button size="xl" variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="icon" disabled={true}>Button</Button>
                    <Button size="icon" disabled={true} variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="icon">Button</Button>
                    <Button size="icon" variant="outline">Button</Button>
                </div>
            </div>
            <div className="p-4 flex-initial space-y-4">
                <Input className="w-64" disabled={true} type="text" placeholder="Inputs" />
                <Input type="text" placeholder="Inputs" />
                <div className="flex flex-row space-x-2">
                    <Button size="sm" disabled={true} variant="accent">Button</Button>
                    <Button size="sm" disabled={true} variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="sm" variant="accent">Button</Button>
                    <Button size="sm" variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="default" disabled={true} variant="accent">Button</Button>
                    <Button size="default" disabled={true} variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="default" variant="accent">Button</Button>
                    <Button size="default" variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="lg" disabled={true} variant="accent">Button</Button>
                    <Button size="lg" disabled={true} variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="lg" variant="accent">Button</Button>
                    <Button size="lg" variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="xl" disabled={true} variant="accent">Button</Button>
                    <Button size="xl" disabled={true} variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="xl" variant="accent">Button</Button>
                    <Button size="xl" variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="icon" disabled={true} variant="accent">Button</Button>
                    <Button size="icon" disabled={true} variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="icon" variant="accent">Button</Button>
                    <Button size="icon" variant="destructive">Button</Button>
                </div>
            </div>
            <div className="p-4 flex-initial space-y-4">
                <Input className="w-64" disabled={true} type="text" placeholder="Inputs" />
                <Input type="text" placeholder="Inputs" />
                <div className="flex flex-row space-x-2">
                    <Switch size="small" disabled={true} />
                </div>
                <div className="flex flex-row space-x-2">
                    <Switch size="small" />
                </div>
                <div className="flex flex-row space-x-2">
                    <Switch size="default" disabled={true} />
                </div>
                <div className="flex flex-row space-x-2">
                    <Switch size="default" />
                </div>
                <div className="flex flex-row space-x-2">
                    <Switch size="large" disabled={true} />
                </div>
                <div className="flex flex-row space-x-2">
                    <Switch size="large" />
                </div>
            </div>
        </div>
        </>
    );
}