"use client";

import { DragableInput } from "@/components/dragable-input";
import { DragableTag } from "@/components/dragable-tag";
import { PromptBox } from "@/components/prompt-box";
import { Button } from "@/components/ui/button";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";
import { ImageCard } from "@/components/image-card";
import { useLocalUrls } from "@/hooks/useLocalUrls";
import { usePrompt } from "@/hooks/usePrompt";
import { BuildableMenu } from "@/components/buildable-menu";
import { CurriculumScreen } from "@/components/curriculum-screen";

export default function Home() {
  const [responseUrls, setResponseUrls] = useState<string[]>([]);
  const [responseLoading, setResponseLoading] = useState(false);
  const { urlsFromLocalStorage, addNewUrl } = useLocalUrls([]);

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
        <CurriculumScreen />
        <div className="flex flex-col w-2/3 items-center flex-grow pl-12">
          <h1 className="pt-8 text-4xl font-bold mb-10 text-center">
            {"Let's Build Something Awesome!"}
          </h1>
          <div className="flex flex-row items-center space-x-2">
            <BuildableMenu />
            <div className="flex flex-row items-center justify-center bg-background rounded-xl drop-shadow-md px-5">
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
