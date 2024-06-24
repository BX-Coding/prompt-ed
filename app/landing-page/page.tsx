"use client"

import { NavBar } from "@/components/navbar"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const auth = getAuth();
  const [logIn, setLogIn] = useState(false);
    onAuthStateChanged(auth, (user) => {
      if (user && !logIn) {
        setLogIn(true);
      }
      if (!user) {
        router.push("/login");
      }
    });

  if (!logIn) {
    return (
      <></>
    );
  } else {
    return (
      <div className="flex flex-col h-screen">
        <NavBar navLocation="home"/>
      </div>
    );
  }
}