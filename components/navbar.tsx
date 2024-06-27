"use client"

import * as React from "react"

import { FC } from 'react';

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";
import Image from "next/image";
import { LogOutIcon, MessageSquareIcon, UserCircle2Icon } from "lucide-react";
import { HomeIcon, FileIcon, MagicIcon } from "./icons/prompt-ed-icons";

const highlightedClassName = " bg-primary ";

const loginHighlightedClassName = " bg-accent hover:bg-accent ";

export const NavBar: FC<{ navLocation? : "home" | "image-library" | "chat" | "images" | "account" | "create-account" | "login", isLoginPage? : boolean }> = ( props: { navLocation? : "home" | "image-library" | "chat" | "images" | "account" | "create-account" | "login", isLoginPage? : boolean } ) => {
    const router = useRouter();
    const handleLogOut = () => {
        signOut(auth).then(() => {
          // Sign-out successful.
              router.push("/");
              console.log("Signed out successfully")
          }).catch((error) => {
          // An error happened.
          });
      }

      return (
        <div className="h-nav-bar bg-card-solid space-x-[17px] flex flex-none flex-row pt-[26px] pl-8 pr-16">
            <Link href = "/home" legacyBehavior passHref>
                <Button variant="navbar" size="navbar-square" className={highlightedClassName}>
                    <Image src="/logo.svg" alt="Hammer" width={36} height={36} />
                </Button>
            </Link>
            <div className="flex grow" />
            {props.isLoginPage ? <>
            <Link href = "/create-account" legacyBehavior passHref>
                <Button variant="navbar" size="navbar" className={(props.navLocation == "create-account" ? loginHighlightedClassName : highlightedClassName)}>
                    Register
                </Button>
            </Link>
            <Link href = "/login" legacyBehavior passHref>
                <Button variant="navbar" size="navbar" className={(props.navLocation == "login" ? loginHighlightedClassName : highlightedClassName)}>
                    Login
                </Button>
            </Link>
            </> : <>
            <Link href = "/home" legacyBehavior passHref>
                <Button variant="navbar" size="navbar" className={(props.navLocation == "home" ? highlightedClassName : "")}>
                    <HomeIcon className="h-[21px] w-[21px] mr-3" color={"var(--accent)"} />
                    Home
                </Button>
            </Link>
            <Link href = "/chat" legacyBehavior passHref>
                <Button variant="navbar" size="navbar" className={(props.navLocation == "chat" ? highlightedClassName : "")}>
                    <MessageSquareIcon className="h-[21px] w-[21px] mr-3" color={"var(--accent)"} />
                    Chat
                </Button>
            </Link>
            <Link href = "/image-gen" legacyBehavior passHref>
                <Button variant="navbar" size="navbar" className={(props.navLocation == "images" ? highlightedClassName : "")}>
                    <MagicIcon className="h-[21px] w-[21px] mr-3" color={"var(--accent)"} />
                    Images
                </Button>
            </Link>
            <Link href = "/image-library" legacyBehavior passHref>
                <Button variant="navbar" size="navbar" className={(props.navLocation == "image-library" ? highlightedClassName : "")}>
                    <FileIcon className="h-[21px] w-[21px] mr-3" color={"var(--accent)"} />
                    Library
                </Button>
            </Link>
            <Link href = "/account" legacyBehavior passHref>
                <Button variant="navbar" size="navbar" className={(props.navLocation == "account" ? highlightedClassName : "")}>
                    <UserCircle2Icon className="h-[21px] w-[21px] mr-3" color={"var(--accent)"} />
                    Account
                </Button>
            </Link>
            <Link href = "/" legacyBehavior passHref>
                <Button variant="navbar" size="navbar" onClick={handleLogOut}>
                    <LogOutIcon className="h-[21px] w-[21px] mr-3" color={"var(--accent)"} />
                    Log Out
                </Button>
            </Link>
            </>}
        </div>
    )
}