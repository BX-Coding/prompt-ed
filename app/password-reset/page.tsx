"use client"
import { NavBar } from "@/components/navbar"
import { ResetForm, StylisticPreviews } from "../../components/login-form"

export default function Home() {

  return (
    <div className="flex flex-col h-screen">
      <NavBar isLoginPage={true} navLocation="account" />
      <div className="flex flex-row h-full">
        <div className="mx-auto min-w-[440px] max-w-[560px] flex h-full flex-col justify-center align-center space-y-6 p-16">
          <div className="flex flex-col space-y-2">
            <h1 className="text-title text-black font-medium tracking-tight">
              Reset Password
            </h1>
          </div>
          <ResetForm />
        </div>
        <div className="flex flex-col max-md:hidden min-w-[320px] w-[60%] max-w-[720px] overflow-clip bg-primary-foreground">
          <StylisticPreviews />
        </div>
      </div>
    </div>
  )
}