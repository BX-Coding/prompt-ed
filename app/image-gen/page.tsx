"use client"

import { NavBar } from "@/components/navbar"
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useState } from "react";
import React from "react";
import { UpdatePassword } from "@/components/update-password-form";
import { AlertDelete } from "@/components/alert-delete";
import { ImageGeneration } from "@/components/image-generation";
import { Button } from "@/components/ui/button";
export default function Home() {

  const auth = getAuth();
  const [logIn, setLogIn] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user && !logIn) {
      setLogIn(true);
    }
  });


  if (!logIn) {
    return (
      <p>Access Denied</p>
    );
  } else {
    return (
      <>
        <div className="flex mb-2 justify-between">
          <h3 className="text-xl text-start font-bold ml-2 mt-2 text-muted">Prompt-Ed</h3>
          <NavBar/>
        </div>
        <div className="flex flex-col items-center">
        <h1 className="text-4xl text-center font-bold mt-10 mb-10">Generate Image</h1>
        <ImageGeneration />
      </div>
      </>
    );
  }
}