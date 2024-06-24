"use client"

import * as React from "react"

import { FC } from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from 'next/navigation';

const highlightedClassName = " bg-primary ";

export const NavBar: FC<{ navLocation? : "home" | "history" | "chat" | "images" | "account" | "create-account" | "login" }> = ( props: { navLocation? : "home" | "history" | "chat" | "images" | "account" | "create-account" | "login" } ) => {
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
    <>
        <NavigationMenu className="flex-initial">
            <NavigationMenuList className="h-nav-bar w-screen bg-card-solid px-9 pt-[26px] items-start">
                <NavigationMenuItem>
                    <Link href = "/landing-page" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle() + (props.navLocation == "home" ? highlightedClassName : "")}>
                            Home
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="flex-1" />
                {window.location.pathname == "/" ? <>
                <NavigationMenuItem>
                    <Link href = "/create-account" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle() + (props.navLocation == "create-account" ? highlightedClassName : "")}>
                            Register
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href = "/login" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle() + (props.navLocation == "login" ? highlightedClassName : "")}>
                            Login
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                </> : <>
                <NavigationMenuItem>
                    <Link href = "/history" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle() + (props.navLocation == "history" ? highlightedClassName : "")}>
                            History
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href = "/chat" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle() + (props.navLocation == "chat" ? highlightedClassName : "")}>
                            Chat
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href = "/image-gen" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle() + (props.navLocation == "images" ? highlightedClassName : "")}>
                            Images
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href = "/account" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle() + (props.navLocation == "account" ? highlightedClassName : "")}>
                            Account
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem onClick={handleLogOut}>
                    <Link href = "/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Log Out
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                </>}
            </NavigationMenuList>
        </NavigationMenu>
    </>
  )
}