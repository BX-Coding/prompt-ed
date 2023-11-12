"use client";

import { DragableInput } from "@/components/dragable-input";
import { DragableTag } from "@/components/dragable-tag";
import { PromptBox } from "@/components/prompt-box";
import { Button } from "@/components/ui/button";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { ImageCard } from "@/components/image-card";
import { useLocalUrls } from "@/hooks/useLocalUrls";
import { usePromptEditorState } from "@/store/editorStore";
import { BuildableTypes } from "@/components/buildable";
import { usePrompt } from "@/hooks/usePrompt";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LessonMenu } from "@/components/lesson-menu";

export default function Home() {
  const [responseUrls, setResponseUrls] = useState<string[]>([]);
  const [responseLoading, setResponseLoading] = useState(false);

  const { urlsFromLocalStorage, addNewUrl } = useLocalUrls([]);
  const [responseLoading, setResponseLoading] = useState(false);

  const addBuildable = usePromptEditorState((state) => state.addBuildable);
  const { constructPrompt } = usePrompt();

  const firebaseFunctionUrl = "https://generateimage-ksagj5rnfq-uc.a.run.app";

  const generateImage = async (prompt: string) => {
    const res = await axios.post(firebaseFunctionUrl, {
      data: { prompt: prompt },
    });
    return res.data.data.map((urlDict: Record<string, string>) => urlDict.url);
  };

  const onGenerateClick = async () => {
    setResponseLoading(true);
    const prompt = "A cute cat";
    const urls = await generateImage(prompt);
    setResponseUrls([...responseUrls, ...urls]);
    setResponseLoading(false);
  };

  return (
    <main className="flex h-screen flex-col items-stretch justify-start bg-primary">
      <div className="flex flex-row flex-grow justify-stretch items-stretch">
        <div className="flex flex-col flex-grow w-1/3 items-stretch">
          <div className="flex flex-row border-2 border-b-0">
            <div className="ml-4 mt-5">
              <Sheet>
                <SheetTrigger>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Lesson Plan</SheetTitle>
                    <SheetDescription>
                      <LessonMenu></LessonMenu>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            <h1 className="text-4xl font-bold my-4 ml-8 text-center">
              {"Title of Lesson"}
            </h1>
          </div>
          <div className="border-2 flex-grow px-4 py-6">
            {
              "Body of Lesson \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, numquam, quam repudiandae porro dolores repellat enim mollitia possimus exercitationem dolore impedit, hic iste quaerat deserunt facere velit laudantium culpa reiciendis!"
            }
          </div>
        </div>
        <div className="flex flex-col w-2/3 items-center flex-grow pl-12">
          <h1 className="pt-8 text-4xl font-bold mb-10 text-center">
            {"Let's Build Something Awesome!"}
          </h1>
          <div className="flex flex-row items-center space-x-2">
            <Button
              variant={"accent"}
              onClick={() => {
                addBuildable(BuildableTypes.FREE_INPUT, "hello");
              }}
            >
              <PlusIcon />
            </Button>
            <div className="flex flex-row items-center justify-center bg-background rounded-xl drop-shadow-md px-5">
              <Image
                className="animate-bounce"
                src="/logo.svg"
                alt="Logo"
                width={50}
                height={50}
              />
              <PromptBox className="space-x-1 p-5">
                <DragableInput />
                <DragableTag
                  placeholder="Select a tag"
                  selectOptions={["Option 1", "Option 2", "Option 3"]}
                />
              </PromptBox>
              <Button
                variant="accent"
                onClick={onGenerateClick}
                disabled={responseLoading}
              >
                <LightningBoltIcon />
                Generate
              </Button>
            </div>
          </div>
          <div className="flex flex-row space-x-5 m-5">
            {urlsFromLocalStorage.map((url, i) => (
              <ImageCard key={i} imageUrl={url.url} promptTitle={url.prompt} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
