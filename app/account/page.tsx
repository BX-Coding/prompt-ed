"use client"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NavBar } from "@/components/navbar"
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster"

export default function Home() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      if (user.email != null) {
        setEmail(user.email);
      }
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  
  const updatePasswordHandler = (user: any, newPassword: string) => {
    updatePassword(user, newPassword).then(() => {
      toast({
        title: "Password Updated",
      });
    }).catch((error) => {
      toast({
        title: "Oops, something's not right",
        description: "Password not updated. Try Again.",
      });
    });
  }

  return (
    <>
      <BrowserRouter>
      <div className="flex mb-2 justify-between">
        <h3 className="text-xl text-start font-bold ml-2 mt-2 text-muted">Prompt-Ed</h3>
        <NavBar/>
      </div>
      <h1 className="text-4xl text-center font-bold mt-10 mb-10">Account Information</h1>
      <h3 className="text-xl text-center font-bold ml-2 mt-2 text-muted">Email: {email}</h3>
      {/* <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="string" placeholder="New Password" onChange={(e) => setPassword(e.target.value)}/>
        <Button type="submit" onClick={() => updatePasswordHandler(auth.currentUser, password)}>Update Password</Button>
      </div> */}
      {/* <Toaster/> */}
      </BrowserRouter>
    </>
  )
}