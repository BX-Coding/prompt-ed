"use client"

import * as React from "react"

import {useState} from 'react';
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { getAuth, updatePassword } from 'firebase/auth'
import { auth, db, storage } from '../app/firebase'
import { Toaster } from "@/components/ui/toaster"
import { toast, useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { usePrompt } from "@/hooks/usePrompt"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes } from "firebase/storage";
import axios from "axios";

export const ImageGeneration: React.FC = ({}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [prompt, setPrompt] = useState('');
    const [imageURL, setImageURL] = useState('');
    //NEED TO CHANGE THIS ONCE API KEY AVAILABLE
    const firebaseFunctionUrl = "https://generateimage-ksagj5rnfq-uc.a.run.app";
    const router = useRouter();


    const generateImage = async (prompt: string) => {
        const res = await axios.post(firebaseFunctionUrl, {
          data: {prompt: prompt,}
        })
        return res.data.data.map((urlDict: Record<string, string>) => urlDict.url)
    }


    async function submitHandler(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
    
        console.log(prompt);
        const urls = await generateImage(prompt)
        setImageURL(urls[0]);
        // setImageURL("https://www.kasandbox.org/programming-images/avatars/leaf-blue.png");
        setIsLoading(false);
        setTimeout(() => {
          setIsLoading(false)
        }, 3000)
    }

    const handleSaveFirebase = () => {
    //save data to firebase
        fetch(imageURL, {
            method: 'GET',
            mode: "cors"
        }).then((response) => response.blob())
        .then((blob) => {
            // Create a URL for the Blob
            const today = new Date();
            saveToFirebase(blob, today);
        });
        console.log("save image");
    }

    async function saveToFirebase(blob: Blob, today: Date) {
        const collectionPath = "users/" + auth.currentUser?.uid +"/images";
        const imageURLNew = URL.createObjectURL(blob);
        const dateStr = today.getMonth() + "/" + today.getDate() + " at " + today.getTime() + ".jpg";
        const storageRef = ref(storage, dateStr);
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          })
    }

    const handleSaveLocal = () => {
        fetch(imageURL, {
            method: 'GET',
            mode: "cors"
        }).then((response) => response.blob())
        .then((blob) => {
            const today = new Date();
            saveToFirebase(blob, today);
            // Create a URL for the Blob
            const url = URL.createObjectURL(blob);

            // Create an anchor element for downloading
            const a = document.createElement('a');
            a.href = url;
            const dateStr = today.getMonth() + "/" + today.getDate() + " at " + today.getTime();
            a.download = dateStr; // Specify the desired download filename

            // Programmatically trigger a click event on the anchor element
            a.click();

            // Clean up by revoking the URL
            URL.revokeObjectURL(url);
        });
    }

    let image, saveLocalBttn, saveFirebaseBttn;
    if (imageURL === '') {
        image = <></>;
        saveLocalBttn = <></>;
        saveFirebaseBttn = <></>;
    } else {
        image = <img src={imageURL} className="mt-20"/>;
        saveFirebaseBttn = <Button onClick={handleSaveFirebase} className="mt-20 mr-10">Save to Prompt-Ed</Button>;
        saveLocalBttn = <Button onClick={handleSaveLocal} className="mt-20">Save to Computer</Button>;

    }

    return (
        <>
        <div className="flex flex-col items-center">
        <form onSubmit={submitHandler}>
            <div className="flex items-center">
            <Input
                    id="prompt"
                    placeholder="a nice image"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="on"
                    autoCorrect="on"
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                    className="mr-5 w-96"
                />
            <Button disabled={isLoading}>
                {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Generate
            </Button>
            </div>
        </form>
        { image }
        <div className="flex flex-row justify-between mt-10">
            { saveFirebaseBttn }
            { saveLocalBttn }
        </div>
        <Toaster />
        </div>
        </>
    );
}