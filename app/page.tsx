"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import axios from "axios";
import { useState } from "react"
import { useLocalUrls } from "@/hooks/useLocalUrls"
import { usePromptEditorState } from "@/store/editorStore"
import { usePrompt } from "@/hooks/usePrompt"
import { useHasHydrated } from "@/hooks/useHasHydrated"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { cn } from "@/lib/utils"
import Link from "next/link"
import "./background.scss"

export default function Home() {

  const { urlsFromLocalStorage, addNewUrl } = useLocalUrls([])
  const setContentIndex = usePromptEditorState((state) => state.setContentIndex)
  const contentIndex = usePromptEditorState((state) => state.contentIndex)
  const [responseLoading, setResponseLoading] = useState(false)
  const hasHydated = useHasHydrated();
  const buildables = usePromptEditorState((state) => state.buildables)
  const emptyPrompt = !hasHydated || buildables.length == 0
  

  const { constructPrompt } = usePrompt()

  const firebaseFunctionUrl = "https://generateimage-ksagj5rnfq-uc.a.run.app"

  const generateImage = async (prompt: string) => {
    const res = await axios.post(firebaseFunctionUrl, {
      data: {prompt: prompt,}
    })
    return res.data.data.map((urlDict: Record<string, string>) => urlDict.url)
  }

  const onGenerateClick = async () => {
    setResponseLoading(true)
    const prompt = constructPrompt();
    const urls = await generateImage(prompt)
    urls.forEach((url: string) => addNewUrl(url, prompt))
    setResponseLoading(false)
    setContentIndex(contentIndex + 1)
  }

  return (
    <>
    <div className="gradient-background">
      <BrowserRouter>
      <main className="flex h-screen flex-row items-center justify-center p-2">
        <div>
        <div className="flex-col items-center">
        <div className="items-center mb-40">
        <h1 className="text-6xl text-center font-bold mb-12">Prompt-Ed &#128396;</h1>
        <br/>
        <h3 className="text-xl text-center font-bold mt-2 text-muted">Generative AI for Kids</h3>
        </div>
        <div className="relative">
        <Link
            href="/login"
            className={cn(
                buttonVariants({ variant: "outline" }),
                "absolute left-10"
            )}
            >
            Login
        </Link>
        <Link
            href="/create-account"
            className={cn(
                buttonVariants({ variant: "outline" }),
                "absolute right-10"
            )}
            >
            Sign Up
        </Link>
        </div>
        </div>
        </div>
        </main>
      </BrowserRouter>
      </div>
    </>
  )
}