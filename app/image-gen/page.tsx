"use client"

import { NavBar } from "@/components/navbar"
import { onAuthStateChanged} from "firebase/auth";
import { useState } from "react";
import React from "react";
import { ImageGeneration } from "@/components/image-generation";
import { auth } from "../firebase";
import { TabbedSidebar } from "@/components/tabbed-sidebar";
import { Button } from "@/components/ui/button";

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
        <div className="flex flex-row h-[calc(100vh-90px)]">
          <TabbedSidebar noCard={true} tabs={[
            {name: "Image History", content: // This content is only here as a reference for what this should look like once actually implemented
              <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-700 max-h-[calc(100vh-235px)] w-full px-4 py-[30px]">
                <p className="text-title-xl font-bold text-white">
                    Image History
                </p>
                <div className="mt-[30px] h-[92px] w-full border-b border-primary">
                  <p className="text-[15px] text-primary">
                    June 3
                  </p>
                  <div className="flex flex-row py-[18px]">
                    <p className="flex-1 text-lg text-white">
                      Title of prompt created
                    </p>
                    <Button variant="accent"></Button>
                  </div>
                </div>
                <div className="mt-[30px] h-[92px] w-full border-b border-primary">
                  <p className="text-[15px] text-primary">
                    June 3
                  </p>
                  <div className="flex flex-row py-[18px]">
                    <p className="flex-1 text-lg text-white">
                      Title of prompt created
                    </p>
                    <Button variant="accent"></Button>
                  </div>
                </div>
                <div className="mt-[30px] h-[92px] w-full border-b border-primary">
                  <p className="text-[15px] text-primary">
                    June 3
                  </p>
                  <div className="flex flex-row py-[18px]">
                    <p className="flex-1 text-lg text-white">
                      Title of prompt created
                    </p>
                    <Button variant="accent"></Button>
                  </div>
                </div>
                <div className="mt-[30px] h-[92px] w-full border-b border-primary">
                  <p className="text-[15px] text-primary">
                    June 3
                  </p>
                  <div className="flex flex-row py-[18px]">
                    <p className="flex-1 text-lg text-white">
                      Title of prompt created
                    </p>
                    <Button variant="accent"></Button>
                  </div>
                </div>
                <div className="mt-[30px] h-[92px] w-full border-b border-primary">
                  <p className="text-[15px] text-primary">
                    June 3
                  </p>
                  <div className="flex flex-row py-[18px]">
                    <p className="flex-1 text-lg text-white">
                      Title of prompt created
                    </p>
                    <Button variant="accent"></Button>
                  </div>
                </div>
                <div className="mt-[30px] h-[92px] w-full border-b border-primary">
                  <p className="text-[15px] text-primary">
                    June 3
                  </p>
                  <div className="flex flex-row py-[18px]">
                    <p className="flex-1 text-lg text-white">
                      Title of prompt created
                    </p>
                    <Button variant="accent"></Button>
                  </div>
                </div>
                <div className="mt-[30px] h-[92px] w-full border-b border-primary">
                  <p className="text-[15px] text-primary">
                    June 3
                  </p>
                  <div className="flex flex-row py-[18px]">
                    <p className="flex-1 text-lg text-white">
                      Title of prompt created
                    </p>
                    <Button variant="accent"></Button>
                  </div>
                </div>
              </div>},
            ]} defaultValue="Image History" />
          <div className="flex flex-col items-center w-full p-12">
            <ImageGeneration />
          </div>
        </div>
      </div>
    );
  }
}