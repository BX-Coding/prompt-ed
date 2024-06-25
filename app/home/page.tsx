"use client"

import { NavBar } from "@/components/navbar"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ImageIcon, ChatBubbleIcon, BackpackIcon } from "@radix-ui/react-icons";
import Link from "next/link";

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
        <div className="flex flex-row h-full">
          {/* A <TabbedSidebar /> could be put here */}
          <div className="grid items-center justify-items-center justify-center content-center w-full h-full">
            <div className="text-black text-[40px] font-medium">
              Let's Build Something Awesome!
            </div>
            <div className="flex mt-2 text-black text-lg">
              Use these examples and templates to get started or create your own.
            </div>
            <div className="flex flex-row mt-8 space-x-10">
              <Button variant="outline" size="xl" className="w-[360px] h-[120px] rounded-[15px] bg-white/40 border-primary-foreground"><p className="text-center text-wrap font-normal font-space-grotesk text-base text-primary-foreground">Example prompt or template that shows how lesson should be applied.</p></Button>
              <Button variant="outline" size="xl" className="w-[360px] h-[120px] rounded-[15px] bg-white/40 border-primary-foreground"><p className="text-center text-wrap font-normal font-space-grotesk text-base text-primary-foreground">Example prompt or template that shows how lesson should be applied.</p></Button>
            </div>
            <div className="flex flex-row mt-6 space-x-10">
              <Button variant="outline" size="xl" className="w-[360px] h-[120px] rounded-[15px] bg-white/40 border-primary-foreground"><p className="text-center text-wrap font-normal font-space-grotesk text-base text-primary-foreground">Example prompt or template that shows how lesson should be applied.</p></Button>
              <Button variant="outline" size="xl" className="w-[360px] h-[120px] rounded-[15px] bg-white/40 border-primary-foreground"><p className="text-center text-wrap font-normal font-space-grotesk text-base text-primary-foreground">Example prompt or template that shows how lesson should be applied.</p></Button>
            </div>
            <div className="flex flex-row mt-12 mb-8 space-x-5">
              <Link href="/image-gen">
                <Button variant="outline" size="xl" className="w-[160px] h-[132px] rounded-[15px] bg-primary-foreground border-secondary">
                  <div className="text-primary text-title font-normal grid justify-items-center gap-1">
                    <ImageIcon className="w-12 h-12" color={"var(--accent)"} />
                    Create
                  </div>
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant="outline" size="xl" className="w-[160px] h-[132px] rounded-[15px] bg-primary-foreground border-secondary">
                  <div className="text-primary text-title font-normal grid justify-items-center gap-1">
                    <ChatBubbleIcon className="w-12 h-12" color={"var(--accent)"} />
                    Chat
                  </div>
                </Button>
              </Link>
              <Link href="/library">
                <Button variant="outline" size="xl" className="w-[160px] h-[132px] rounded-[15px] bg-primary-foreground border-secondary">
                  <div className="text-primary text-title font-normal grid justify-items-center gap-1">
                    <BackpackIcon className="w-12 h-12" color={"var(--accent)"} />
                    Library
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}