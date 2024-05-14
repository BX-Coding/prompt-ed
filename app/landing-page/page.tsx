"use client"

import { NavBar } from "@/components/navbar"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default function Home() {

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
    </>
  )
}