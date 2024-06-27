"use client"

import { NavBar } from "@/components/navbar"
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useState } from "react";
import React from "react";
import { UpdatePassword } from "@/components/update-password-form";
import { AlertDelete } from "@/components/alert-delete";
import { Card } from "@/components/ui/card";
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
          <Card className="mx-12 my-6 p-12">
            <div className="flex flex-col items-start gap-4">
              <h1 className="text-title-xl text-black text-center font-bold">Account Information</h1>
              <h3 className="text-xl text-center font-bold text-muted">Email: {email}</h3>
              <h3 className="text-xl text-center font-bold text-muted">Update Password:</h3>
              <UpdatePassword />
              <div className="mt-20">
                <AlertDelete />
              </div>
            </div>
          </Card>
      </div>
    );
  }
}