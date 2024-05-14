"use client"

import { NavBar } from "@/components/navbar"

export default function Home() {

  return (
    <>
      <div className="flex mb-2 justify-between">
        <h3 className="text-xl text-start font-bold ml-2 mt-2 text-muted">Prompt-Ed</h3>
        <NavBar/>
      </div>
    </>
  )
}