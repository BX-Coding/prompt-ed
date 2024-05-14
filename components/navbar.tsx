"use client"

import * as React from "react"

import {FC, useState} from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useNavigate } from "react-router-dom";
  


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface ResetFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NavBar: FC = ({}) => {

    const navigate = useNavigate();
    const handleLogOut = () => {
        signOut(auth).then(() => {
          // Sign-out successful.
              navigate("/");
              navigate(0);
              console.log("Signed out successfully")
          }).catch((error) => {
          // An error happened.
          });
      }

  return (
    <>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href = "/landing-page" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            History
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href = "/landing-page" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Chat
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href = "/landing-page" legacyBehavior passHref>
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