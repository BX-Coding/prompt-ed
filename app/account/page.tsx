"use client"

import { NavBar } from "@/components/navbar"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import React from "react";
import { UpdatePassword } from "@/components/update-password-form";
import { Button } from "@/components/ui/button";
import { RightArrowIcon } from "@/components/icons/prompt-ed-icons";
import { Toaster } from "@/components/ui/toaster";
import { UserDetails } from "@/components/user-details-form";
export default function Home() {

  const [email, setEmail] = useState('');

  const auth = getAuth();
  const [logIn, setLogIn] = useState(false);
  const [updatePasswordShow, setUpdatePasswordShow] = useState(false);

  const showUpdatePassword = () => {
    setUpdatePasswordShow(true);
  };
  const hideUpdatePassword = () => {
    setUpdatePasswordShow(false);
  }

  const [userDetailsShow, setUserDetailsShow] = useState(false);

  const showUserDetails = () => {
    setUserDetailsShow(true);
  };
  const hideUserDetails = () => {
    setUserDetailsShow(false);
  }

  useEffect(() => {onAuthStateChanged(auth, (user) => {
    if (user && user.email !== null) {
      setEmail(user.email);
    }
    if (user && !logIn) {
      setLogIn(true);
    }
  })}, [auth, logIn]);

  if (!logIn) {
    return (
      <p>Access Denied</p>
    );
  } else {
    return (
      <div className="flex flex-col h-screen">
        <NavBar navLocation="account" />
        <div className="rounded-xl border bg-card-solid mx-12 my-6">
          <Button onClick={showUserDetails} variant="ghost" size="menu" className="flex w-full rounded-none">Account Details<div className="flex-1" /><RightArrowIcon width={16} height={16} /></Button>
          <Button onClick={showUpdatePassword} variant="ghost" size="menu" className="flex w-full rounded-none border-t">Change Password<div className="flex-1" /><RightArrowIcon width={16} height={16} /></Button>
        </div>
        {updatePasswordShow && <UpdatePassword onClose={hideUpdatePassword} />}
        {userDetailsShow && <UserDetails email={email} onClose={hideUserDetails} />}
        <Toaster />
      </div>
    );
  }
}