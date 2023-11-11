import { DragableInput } from "@/components/dragable-input"
import { DragableTag } from "@/components/dragable-tag"
import { PromptBox } from "@/components/prompt-box"
import { Button } from "@/components/ui/button"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import Image from "next/image"

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 bg-primary">
      <h1 className="text-4xl font-bold mb-10">Let's build something awesome!</h1>
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
        <Button variant="accent">
          <LightningBoltIcon/>
          Generate
        </Button>
      </div>
    </main>
  )
}