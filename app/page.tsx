"use client"

import { DragableInput } from "@/components/dragable-input"
import { DragableTag } from "@/components/dragable-tag"
import { PromptBox } from "@/components/prompt-box"
import { Button } from "@/components/ui/button"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import axios from "axios";
import { useState } from "react"
import { ImageCard } from "@/components/image-card"

export default function Home() {

  const [responseUrls, setResponseUrls] = useState<string[]>([])
  const [responseLoading, setResponseLoading] = useState(false)

  const firebaseFunctionUrl = "https://generateimage-ksagj5rnfq-uc.a.run.app"

  const generateImage = async (prompt: string) => {
    const res = await axios.post(firebaseFunctionUrl, {
      data: {prompt: prompt,}
    })
    return res.data.data.map((urlDict: Record<string, string>) => urlDict.url)
  }

  const onGenerateClick = async () => {
    setResponseLoading(true)
    const prompt = "A cute cat"
    const urls = await generateImage(prompt)
    setResponseUrls([...responseUrls, ...urls])
    setResponseLoading(false)
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 bg-primary">
      <h1 className="text-4xl font-bold mb-10">{"Let's build something awesome!"}</h1>
      <div className="flex flex-row items-center justify-center bg-background rounded-xl drop-shadow-md px-5">
        <Image
          className="animate-bounce"
          src="/logo.svg"
          alt="Logo"
          width={50}
          height={50}
        />
        <PromptBox className="space-x-1 p-5">
          <DragableInput/>
          <DragableTag placeholder="Select a tag" selectOptions={["Option 1", "Option 2", "Option 3"]}/>
        </PromptBox>
        <Button variant="accent" onClick={onGenerateClick} disabled={responseLoading}>
          <LightningBoltIcon/>
          Generate
        </Button>
      </div>
      <div className="flex flex-row space-x-5 m-5">
        <ImageCard key={0} imageUrl={"https://oaidalleapiprodscus.blob.core.windows.net/private/org-vmWUuH2VT9PwlmTJgSb6LY5F/user-AUuZqw7qXoUB9SOuGx55mEe2/img-PzCp88pSxXionPwfCarayBam.png?st=2023-11-11T23%3A56%3A36Z&se=2023-11-12T01%3A56%3A36Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-11T17%3A31%3A56Z&ske=2023-11-12T17%3A31%3A56Z&sks=b&skv=2021-08-06&sig=bGQA7k5hKrWSl%2BqhttNShzBOkMwCXA7qYcYN7n/ykwo%3D"} promptTitle="A cute cat" />
        <ImageCard key={1} imageUrl={"https://oaidalleapiprodscus.blob.core.windows.net/private/org-vmWUuH2VT9PwlmTJgSb6LY5F/user-AUuZqw7qXoUB9SOuGx55mEe2/img-PzCp88pSxXionPwfCarayBam.png?st=2023-11-11T23%3A56%3A36Z&se=2023-11-12T01%3A56%3A36Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-11T17%3A31%3A56Z&ske=2023-11-12T17%3A31%3A56Z&sks=b&skv=2021-08-06&sig=bGQA7k5hKrWSl%2BqhttNShzBOkMwCXA7qYcYN7n/ykwo%3D"} promptTitle="A cute cat" />
        {responseUrls.map((url, i) => (
          <ImageCard key={i} imageUrl={url} promptTitle="A cute cat" />
        ))}
      </div>
    </main>
  )
}