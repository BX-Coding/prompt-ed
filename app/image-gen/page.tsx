"use client"

import { NavBar } from "@/components/navbar"
import { onAuthStateChanged} from "firebase/auth";
import { useState } from "react";
import React from "react";
import { ImageGeneration } from "@/components/image-generation";
import { auth } from "../firebase";

export default function Home() {

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
      <div className="flex flex-col h-screen">
        <NavBar navLocation="images"/>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl text-center font-bold mt-10 mb-10">Generate Image</h1>
          <ImageGeneration />
        </div>
      </div>
    );
  }
}