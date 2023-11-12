"use client";

import { DragableInput } from "@/components/dragable-input";
import { DragableTag } from "@/components/dragable-tag";
import { PromptBox } from "@/components/prompt-box";
import { Button } from "@/components/ui/button";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react"
import { ImageCard } from "@/components/image-card"
import { useLocalUrls } from "@/hooks/useLocalUrls"
import { usePromptEditorState } from "@/store/editorStore"
import { BuildableTypes } from "@/components/buildable"
import { usePrompt } from "@/hooks/usePrompt"
import { BuildableMenu } from "@/components/buildable-menu"
import { useHasHydrated } from "@/hooks/useHasHydrated"

export default function Home() {
  const [responseUrls, setResponseUrls] = useState<string[]>([]);
  const [responseLoading, setResponseLoading] = useState(false);
  const { urlsFromLocalStorage, addNewUrl } = useLocalUrls([]);

  const { urlsFromLocalStorage, addNewUrl } = useLocalUrls([])
  const [responseLoading, setResponseLoading] = useState(false)
  const hasHydated = useHasHydrated();
  const buildables = usePromptEditorState((state) => state.buildables)
  const emptyPrompt = !hasHydated || buildables.length == 0
  

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
    <main className="flex h-screen flex-col items-center justify-center p-24 bg-primary">
      <h1 className="text-4xl font-bold mb-10">{"Let's build something awesome!"}</h1>
      <div className="flex flex-row items-center space-x-2">
        <div className="flex flex-col items-center justify-center">
          <BuildableMenu/>
          { emptyPrompt && <h4 className="text-xl font-bold mt-2 text-muted italic">Click to start!</h4>}
        </div>
        {!emptyPrompt && <div className="flex flex-row items-center justify-center bg-background rounded-xl drop-shadow-md px-5">
          <PromptBox className="space-x-1 p-5"/>
          <Button variant="accent" onClick={onGenerateClick} disabled={responseLoading}>
            <LightningBoltIcon/>
            Generate
          </Button>
        </div>}
      </div>
    </main>
  );
}
