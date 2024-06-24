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

  const [showSidebar, setShowSidebar] = useState(true);

  const toggleShowSidebar = () => {
    if (showSidebar) {

    }

    setShowSidebar(!showSidebar);
  }

  if (!logIn) {
    return (
      <></>
    );
  } else {
    return (
      <div className="flex flex-col h-screen">
        <NavBar navLocation="home"/>
        <div className="flex flex-row">
          <div className={"bg-primary-foreground flex flex-row h-[calc(100vh-90px)] max-xl:absolute max-xl:top-[90px] max-xl:left-0 " + (showSidebar ? " max-xl:w-[calc(100%-20px)] xl:w-[600px] " : " w-5 ")}>
            <div className={(showSidebar ? "" : "hidden")}>
              <TabbedSidebar defaultValue="Lesson 1" tabs={[
                {name: "Lesson 1", content:
                  <p className="text-xl font-bold">
                    Welcome to Neural Kingdom
                  </p>
                },
                {name: "Lesson 2", content:
                  <p className="text-xl font-bold">
                    Welcome to Neural Kingdom
                  </p>
                },
                {name: "Lesson 3", content:
                  <p className="text-xl font-bold">
                    Welcome to Neural Kingdom
                  </p>
                },
                {name: "Lesson 4", content:
                  <p className="text-xl font-bold">
                    Welcome to Neural Kingdom
                  </p>
                },
                {name: "Lesson 5", content:
                  <p className="text-xl font-bold">
                    Welcome to Neural Kingdom
                  </p>
                },
              ]} />
            </div>
          </div>
          <div>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <Button size="sm" variant="accent" className={"absolute top-[200px] rounded-full " + (showSidebar ? " max-xl:left-[calc(100%-30px)] xl:left-[590px] " : " left-[10px] ")} onClick={toggleShowSidebar}>&gt;</Button>
      </div>
    );
  }
}