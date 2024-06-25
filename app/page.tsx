"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useLocalUrls } from "@/hooks/useLocalUrls";
import { usePromptEditorState } from "@/store/editorStore";
import { usePrompt } from "@/hooks/usePrompt";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import { cn } from "@/lib/utils";
import Link from "next/link";
import "./background.scss";

export default function Home() {
  const { urlsFromLocalStorage, addNewUrl } = useLocalUrls([]);
  const setContentIndex = usePromptEditorState(
    (state) => state.setContentIndex
  );
  const contentIndex = usePromptEditorState((state) => state.contentIndex);
  const [responseLoading, setResponseLoading] = useState(false);
  const hasHydated = useHasHydrated();
  const buildables = usePromptEditorState((state) => state.buildables);
  const emptyPrompt = !hasHydated || buildables.length == 0;

  const { constructPrompt } = usePrompt();

  const firebaseFunctionUrl = "https://generateimage-74knvorwhq-uc.a.run.app";

  const generateImage = async (prompt: string) => {
    const res = await axios.post(firebaseFunctionUrl, {
      data: { prompt: prompt },
    });
    return res.data.data.map((urlDict: Record<string, string>) => urlDict.url);
  };

  const onGenerateClick = async () => {
    setResponseLoading(true);
    const prompt = constructPrompt();
    const urls = await generateImage(prompt);
    urls.forEach((url: string) => addNewUrl(url, prompt));
    setResponseLoading(false);
    setContentIndex(contentIndex + 1);
  };

  return (
    <div className="gradient-background">
      <main className="flex h-screen flex-row items-center justify-center p-2">
        <div className="flex-col items-center">
          <div className="items-center">
            <h1 className="text-6xl text-center font-bold mb-6">
              Prompt-Ed &#128396;
            </h1>
            <br />
            <h3 className="text-xl text-center font-bold mt-2 mb-20 text-muted">
              Generative AI for Kids
            </h3>
          </div>
          <div className="relative">
            <Button
              asChild
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "absolute left-5"
              )}
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "absolute right-5"
              )}
            >
              <Link href="/create-account">Sign-Up</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
