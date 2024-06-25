"use client"
import Link from "next/link"
import { LoginForm, StylisticPreviews } from "../../components/login-form"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { NavBar } from "@/components/navbar"

export default function Home() {


  return (
    <div className="flex flex-col h-screen">
      <NavBar navLocation="login" isLoginPage={true} />
      <div className="flex flex-row h-full">
        <div className="mx-auto min-w-[440px] max-w-[560px] flex h-full flex-col justify-center align-center space-y-6 p-16">
          <div className="flex flex-col space-y-2">
            <h1 className="text-title text-black font-medium tracking-tight">
              Get started for free!
            </h1>
            <p className="text-black">
              Log in to access your personalized dashboard and start generating amazing images!
            </p>
          </div>
          <LoginForm />
        </div>
        <div className="flex flex-col max-md:hidden min-w-[320px] w-[60%] max-w-[720px] overflow-clip bg-primary-foreground">
          <StylisticPreviews />
        </div>
      </div>
    </div>
  )
}