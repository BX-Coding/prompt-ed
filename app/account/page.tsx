"use client"

import { NavBar } from "@/components/navbar"
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { Icons } from "@/components/icons";
import { UpdatePassword } from "@/components/update-password-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { AlertDelete } from "@/components/alert-delete";
export default function Home() {

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [password, setPassword] = useState('');

  const auth = getAuth();
  if (localStorage.getItem("logged_in") === "0") {
    return (
      <p>Access Denied</p>
    );
  }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      if (user.email != null) {
        setEmail(user.email);
      }
      localStorage.setItem("logged_in", "1");
      // ...
    } else {
      // User is signed out
      // ...
      localStorage.setItem("logged_in", "0");
    }
  });

  return (
    <>
      <div className="flex mb-2 justify-between">
        <h3 className="text-xl text-start font-bold ml-2 mt-2 text-muted">Prompt-Ed</h3>
        <NavBar/>
      </div>
      <div className="flex flex-col items-center">
      <h1 className="text-4xl text-center font-bold mt-10 mb-10">Account Information</h1>
      <h3 className="text-xl text-center font-bold ml-2 mt-2 mb-10 text-muted">Email: {email}</h3>
      <h3 className="text-xl text-center font-bold ml-2 mt-2 mb-2 text-muted">Update Password:</h3>
      <UpdatePassword />
      <div className="mt-20">
        <AlertDelete />
      </div>
    </div>
    </>
  )
}