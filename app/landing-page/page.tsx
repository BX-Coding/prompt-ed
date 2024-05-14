"use client"

import { NavBar } from "@/components/navbar"
import { getAuth } from "firebase/auth"

export default function Home() {

  const auth = getAuth();
  if (auth.currentUser === null) {
    return (
      <p>Access Denied</p>
    );
  }
  return (
    <>
      <div className="flex mb-2 justify-between">
        <h3 className="text-xl text-start font-bold ml-2 mt-2 text-muted">Prompt-Ed</h3>
        <NavBar/>
      </div>
    </>
  )
}