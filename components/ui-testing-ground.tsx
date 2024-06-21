"use client"

import * as React from "react"

import {useState} from 'react';
import { Icons } from "@/components/icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { auth, storage } from '../app/firebase'
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from 'next/navigation'
import { ref, uploadBytes } from "firebase/storage";
import axios from "axios";

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
                    <Button disabled={true}>Button</Button>
                    <Button disabled={true} variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button>Button</Button>
                    <Button variant="outline">Button</Button>
                </div>
            </div>
            <div className="p-4 flex-initial space-y-4">
                <Input className="w-64" disabled={true} type="text" placeholder="Inputs" />
                <Input type="text" placeholder="Inputs" />
                <div className="flex flex-row space-x-2">
                    <Button disabled={true} variant="accent">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button variant="accent">Button</Button>
                </div>
            </div>
            <div className="p-4 flex-initial space-y-4">
                <Input className="w-64" disabled={true} type="text" placeholder="Inputs" />
                <Input type="text" placeholder="Inputs" />
                <div className="flex flex-row space-x-2">
                    <Button disabled={true} variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button variant="destructive">Button</Button>
                </div>
            </div>
        </div>
        </>
    );
}