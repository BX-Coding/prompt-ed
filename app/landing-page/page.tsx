"use client"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NavBar } from "@/components/navbar"

export default function Home() {

  return (
    <>
      <BrowserRouter>
      <div className="flex mb-2 justify-between">
        <h3 className="text-xl text-start font-bold ml-2 mt-2 text-muted">Prompt-Ed</h3>
        <NavBar/>
      </div>
      </BrowserRouter>
    </>
  )
}