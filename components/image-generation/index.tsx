"use client";

import * as React from "react";

import { useState } from "react";
import { Icons } from "@/components/icons";
import { Button } from "../ui/button";
import { auth, storage, functions } from "../../app/firebase";
import { httpsCallable } from "firebase/functions";
import { Toaster } from "@/components/ui/toaster";
import { ref, uploadBytes } from "firebase/storage";

import { PromptBox } from "../prompt-box";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { BuildableMenu } from "../buildable-menu";
import { usePrompt } from "@/hooks/usePrompt";
import { Card, CardContent } from "../ui/card";
import { DownloadIcon, StarIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

type GenerateImageResponse = {
  created: Date;
  data: Uint8Array;
};

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
  const [res, setRes] = useState<JSX.Element>(<></>);
  const { constructPrompt, resetPrompt, addTextBlock } = usePrompt();

  const generateImage = httpsCallable(functions, "generateImageCall");

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    setRes(<></>);
    setImageURL("");
    setIsLoading(true);

    try {
      const finalPrompt = constructPrompt();
      const response = await generateImage({ prompt: finalPrompt });
      const data = response.data as GenerateImageResponse;
      console.log(response);
      var imagearray: number[] = [];
      Object.values(data.data as Object).forEach((x) =>
        imagearray.push(x as number)
      );
      var imageblob = new Blob([new Uint8Array(imagearray)], {
        type: "application/octet-stream",
      });

      const url = URL.createObjectURL(imageblob);

      setImageURL(url);
      setRes(<img alt={prompt} src={url} className="rounded-lg w-full" />);

      setIsLoading(false);
    } catch (e: any) {
      console.log(e.code);
      if (e.code === "functions/permission-denied") {
        setRes(
          <div className="rounded-lg">
            Negative flags detected in your prompt or image, enter another
            prompt and try again.
          </div>
        );
      } else {
        setRes(
          <div className="rounded-lg">
            Something went wrong with our request, please try again.
          </div>
        );
      }
      setIsLoading(false);
    }
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

  let saveLocalBttn, saveFirebaseBttn;
  if (imageURL) {
    saveFirebaseBttn = (
      <Button onClick={handleSaveFirebase} variant="accent" className="bg-transparent px-2">
        <StarIcon color="var(--accent)" />
      </Button>
    );
    saveLocalBttn = (
      <Button onClick={handleSaveLocal} variant="accent" className="bg-transparent px-2">
        <DownloadIcon color="var(--accent)" />
      </Button>
    );
  }

  return (
    <Card className="h-full w-full">
      <ScrollArea colorScheme="blue" className="h-full w-full px-6">
        <div className="h-12 w-full" />
        <div className={"flex flex-col items-center space-y-4 bg-primary-foreground rounded-lg pt-8 px-5 pb-4 mb-4" + (imageURL == "" ? " hidden" : "")}>
          {res}
          <div className="flex flex-row w-full justify-end space-x-2">
            {saveFirebaseBttn}
            {saveLocalBttn}
          </div>
        </div>
        <div className="p-4 w-full bg-card-solid rounded-lg">
          <form className="w-full" onSubmit={submitHandler}>
            <div className="flex items-start h-full w-full flex-col space-y-2">
              <div className="flex flex-row w-full space-x-1">
                <BuildableMenu />
                <PromptBox className="gap-1" />
              </div>
              <Button variant="outline" className="self-end" disabled={isLoading}>
                {isLoading ? (
                  <Icons.spinner className="ml-[-4px] mr-1 h-[15px] w-[15px] animate-spin" />
                ) : (<LightningBoltIcon className="ml-[-4px] mr-1 h-[15px] w-[15px]" />)}
                Generate
              </Button>
            </div>
          </form>
          <Toaster />
        </div>
        <div className="h-12 w-full" />
      </ScrollArea>
    </Card>
  );
};
