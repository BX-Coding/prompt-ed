"use client"

import { NavBar } from "@/components/navbar"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TabbedSidebar } from "@/components/tabbed-sidebar";

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
        <NavBar navLocation="home" />
        <div className="flex flex-row">
          <TabbedSidebar defaultValue="Lesson 1" tabs={[
            {
              name: "Lesson 1", content:
                <p className="text-xl font-bold">
                  Welcome to Neural Kingdom
                </p>
            },
            {
              name: "Lesson 2", content:
                <p className="text-xl font-bold">
                  Welcome to Neural Kingdom
                </p>
            },
            {
              name: "Lesson 3", content:
                <p className="text-xl font-bold">
                  Welcome to Neural Kingdom
                </p>
            },
            {
              name: "Lesson 4", content:
                <p className="text-xl font-bold">
                  Welcome to Neural Kingdom
                </p>
            },
            {
              name: "Lesson 5", content:
                <p className="text-xl font-bold">
                  Welcome to Neural Kingdom
                </p>
            },
          ]} />
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    );
  }
}