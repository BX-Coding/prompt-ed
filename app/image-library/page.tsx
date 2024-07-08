"use client"

import * as React from "react";

import { NavBar } from "@/components/navbar"
import { onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { storage, auth } from "../../app/firebase";
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FullMetadata, ListResult, StorageReference, getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import { EditIcon } from "@/components/icons/prompt-ed-icons";
import { Button } from "@/components/ui/button";

interface UserImage {
    url:string
    date:string
    prompt:string | undefined
}

export default function Home() {
    const [logIn, setLogIn] = useState(false);
    const [userGeneratedImages, setUserGeneratedImages] = useState<UserImage[]>([])
    const [userID, setUserID] = useState(auth.currentUser?.uid);

    onAuthStateChanged(auth, (user) => {
        if (user && !logIn) {
            setLogIn(true);
        }
        if (user && typeof userID === 'undefined') {
            setUserID(user.uid);
        }
    });

    React.useEffect(()=>{
        const getUserImages = async (folderName: string | undefined): Promise<void> => {
        const folderRef: StorageReference = ref(storage, folderName);
        const savedUserImages: UserImage[] = [];
        
        try {
            const result: ListResult = await listAll(folderRef);
        
            const urlPromises: Promise<UserImage>[] = result.items.map(async (itemRef: StorageReference) => {
            const url = await getDownloadURL(itemRef);
            const metadata: FullMetadata = await getMetadata(itemRef);
            const date = metadata.timeCreated; 
            const prompt = metadata.customMetadata?.prompt
            return { url, date, prompt};
            });
        
            const userImages: UserImage[] = await Promise.all(urlPromises);
            userImages.reverse()
            savedUserImages.push(...userImages);
        } catch (error) {
            console.error("Error getting image URLs:", error);
        }
        
        setUserGeneratedImages(savedUserImages);
        };

        getUserImages(auth.currentUser?.uid)
    },[userID])

    onAuthStateChanged(auth, (user) => {
        if (user && !logIn) {
        setLogIn(true);
        }
    });

    if (!logIn) {
        return (
        <p>Access Denied</p>
        );
    } else {
        return (
        <div className="flex flex-col h-screen">
            <NavBar navLocation="image-library"/>
            <div className="flex flex-row h-[calc(100vh-90px)]">
                <div className="flex flex-col items-center w-full px-12 py-6">
                    <Card className="max-lg:w-full lg:w-4/5 h-full">
                        <ScrollArea colorScheme="blue" type="auto" className="h-full w-full px-6">
                            <div className="h-12 w-full" />
                            <div className="columns-3xs gap-4 space-y-4">
                                {userGeneratedImages.map((image, key) => (
                                    <div className="min-w-64 space-y-2" key={key}>
                                        <img className="rounded-lg" src={image.url} height="auto" />
                                        <div className="flex flex-row text-text-t2 text-chat">
                                            {image.prompt}
                                            <div className="flex-1" />
                                            <Button variant="accent" size="lg" className="h-[25px] w-[25px] rounded-lg p-1">
                                                <EditIcon className="w-[21px] h-[21px] text-primary" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-12 w-full" />
                        </ScrollArea>
                    </Card>
                </div>
            </div>
        </div>
        );
    }
}