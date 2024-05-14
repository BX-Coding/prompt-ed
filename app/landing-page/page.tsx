"use client"

import { NavBar } from "@/components/navbar"
import { getAuth } from "firebase/auth"
export default function Home() {

  const auth = getAuth();
  let user = "0";
  async function CheckLogin() {
    if (auth.currentUser === null) {
      setTimeout(() => {
        if (auth.currentUser === null) {
          user = "0";
        } else {
          user = "1";
        }
      }, 3000)
    } else {
      user = "1";
    }
  }
  CheckLogin();
  if (user === "0") {
    console.log("inside")
    return (
      <p>Access Denied</p>
    );
  } else {
  return (
    <>
      <div className="flex mb-2 justify-between">
        <h3 className="text-xl text-start font-bold ml-2 mt-2 text-muted">Prompt-Ed</h3>
        <NavBar/>
      </div>
    </>
  )}
}