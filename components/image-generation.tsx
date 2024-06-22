"use client";

import * as React from "react";

import { useState } from "react";
import { Icons } from "@/components/icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { auth, storage, functions } from "../app/firebase";
import { httpsCallable } from "firebase/functions";
import { Toaster } from "@/components/ui/toaster";
import { ref, uploadBytes } from "firebase/storage";

import axios from "axios";
import { Toggle } from "./ui/toggle";
import { PromptBox } from "./prompt-box";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { BuildableMenu } from "./buildable-menu";

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
export const ImageGeneration: React.FC = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [blockMode, setBlockMode] = useState(false);

  const toggleMode = () => {
    setBlockMode(!blockMode);
  };

  const generateImage = httpsCallable(functions, "generateImage");

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const response = await generateImage({ prompt: prompt });

    var imagearray: number[] = [];
    interface Dict {
      [key: number]: number;
    }
    Object.values(response.data as Object).forEach((x) =>
      imagearray.push(x as number)
    );
    var imageblob = new Blob([new Uint8Array(imagearray)], {
      type: "application/octet-stream",
    });

    const url = URL.createObjectURL(imageblob);
    console.log(url);

    setImageURL(url);

    setIsLoading(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  //This will save image to Firebase storage as a Blob after fetching url - UNTESTED
  const handleSaveFirebase = () => {
    //save data to firebase
    fetch(imageURL, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create a URL for the Blob
        const today = new Date();
        saveToFirebase(blob, today);
      });
    console.log("save image");
  };

  //This will save image to Firebase storage as a Blob - UNTESTED
  async function saveToFirebase(blob: Blob, today: Date) {
    const collectionPath = "users/" + auth.currentUser?.uid + "/images";
    const imageURLNew = URL.createObjectURL(blob);
    const dateStr = today.toString().replace(" ", "_") + ".png";
    const storageRef = ref(storage, dateStr);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  }

  //This will save image to the local system and save to Firebase storage as a Blob - UNTESTED
  const handleSaveLocal = () => {
    fetch(imageURL, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const today = new Date();
        saveToFirebase(blob, today);
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create an anchor element for downloading
        const a = document.createElement("a");
        a.href = url;
        const dateStr = today.toString().replace(" ", "_");
        a.download = dateStr; // Specify the desired download filename

        // Programmatically trigger a click event on the anchor element
        a.click();

        // Clean up by revoking the URL
        URL.revokeObjectURL(url);
      });
  };

  let image, saveLocalBttn, saveFirebaseBttn;
  if (imageURL === "") {
    image = <></>;
    saveLocalBttn = <></>;
    saveFirebaseBttn = <></>;
  } else {
    image = <img src={imageURL} className="mt-20" />;
    saveFirebaseBttn = (
      <Button onClick={handleSaveFirebase} className="mt-20 mr-10">
        Save to Prompt-Ed
      </Button>
    );
    saveLocalBttn = (
      <Button onClick={handleSaveLocal} className="mt-20">
        Save to Computer
      </Button>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-10">
        <Toggle onClick={toggleMode} aria-label="Toggle bold">
          Block Mode
        </Toggle>
        <form onSubmit={submitHandler}>
          <div className="flex items-center">
            {!blockMode ? (
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
            ) : (
              <>
                <BuildableMenu />
                <PromptBox className="space-x-1 p-5" />
              </>
            )}
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <LightningBoltIcon /> Generate
            </Button>
          </div>
        </form>
        {image}
        <div className="flex flex-row justify-between mt-10">
          {saveFirebaseBttn}
          {saveLocalBttn}
        </div>
        <Toaster />
      </div>
    </>
  );
};
