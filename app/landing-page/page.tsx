"use client"

import { NavBar } from "@/components/navbar"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState } from "react";
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
      </>
    );
  }
}