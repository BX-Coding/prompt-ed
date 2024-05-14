"use client"

import { NavBar } from "@/components/navbar"
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useState } from "react";
import React from "react";
import { UpdatePassword } from "@/components/update-password-form";
import { AlertDelete } from "@/components/alert-delete";
export default function Home() {

  const [email, setEmail] = useState('');

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