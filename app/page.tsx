import { PromptBox } from "@/components/prompt-box"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 bg-background">
      <PromptBox className="p-10 bg-white">
        <div className="bg-black text-white p-5">Hello 1</div>
        <div className="bg-black text-white p-5">Hello 2</div>
      </PromptBox>
    </main>
  )
}