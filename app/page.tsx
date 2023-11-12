"use client"

import { DragableInput } from "@/components/dragable-input"
import { DragableTag } from "@/components/dragable-tag"
import { PromptBox } from "@/components/prompt-box"
import { Button } from "@/components/ui/button"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import { PlusIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import axios from "axios";
import { useState } from "react"
import { ImageCard } from "@/components/image-card"
import { useLocalUrls } from "@/hooks/useLocalUrls"
import { usePromptEditorState } from "@/store/editorStore"
import { BuildableTypes } from "@/components/buildable"
import { usePrompt } from "@/hooks/usePrompt"
import { BuildableMenu } from "@/components/buildable-menu"

export default function Home() {

  const { urlsFromLocalStorage, addNewUrl } = useLocalUrls([])
  const [responseLoading, setResponseLoading] = useState(false)

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
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 bg-primary">
      <h1 className="text-4xl font-bold mb-10">{"Let's build something awesome!"}</h1>
      <div className="flex flex-row items-center space-x-2">
        <BuildableMenu/>
        <div className="flex flex-row items-center justify-center bg-background rounded-xl drop-shadow-md px-5">
          <PromptBox className="space-x-1 p-5">
            <DragableInput/>
            <DragableTag placeholder="Select a tag" selectOptions={["Option 1", "Option 2", "Option 3"]}/>
          </PromptBox>
          <Button variant="accent" onClick={onGenerateClick} disabled={responseLoading}>
            <LightningBoltIcon/>
            Generate
          </Button>
        </div>
      </div>
      <div className="flex flex-row space-x-5 m-5">
        {urlsFromLocalStorage.map((url, i) => (
          <ImageCard key={i} imageUrl={url.url} promptTitle={url.prompt} />
        ))}
      </div>
    </main>
  )
}