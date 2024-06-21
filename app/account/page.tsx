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
  const [logIn, setLogIn] = useState(false);
    onAuthStateChanged(auth, (user) => {
      if (user && user.email !== null) {
        setEmail(user.email);
      }
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
          <NavBar navLocation="account"/>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl text-center font-bold mt-10 mb-10">Account Information</h1>
            <h3 className="text-xl text-center font-bold ml-2 mt-2 mb-10 text-muted">Email: {email}</h3>
            <h3 className="text-xl text-center font-bold ml-2 mt-2 mb-2 text-muted">Update Password:</h3>
            <UpdatePassword />
            <div className="mt-20">
              <AlertDelete />
            </div>
          </div>
      </div>
    );
  }
}