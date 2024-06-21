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

export const NavBar: FC = ({}) => {
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
            <NavigationMenuList className="h-nav-bar w-screen bg-card px-9 pt-[26px] items-start">
                <NavigationMenuItem>
                    <Link href = "/history" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            History
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="flex-1" />
                <NavigationMenuItem>
                    <Link href = "/history" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            History
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href = "/chat" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Chat
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href = "/image-gen" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Images
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href = "/account" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
            </NavigationMenuList>
        </NavigationMenu>
    </>
  )
}