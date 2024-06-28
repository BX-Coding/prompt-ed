"use client"

import Link from "next/link"
import { StylisticPreviews, UserAuthForm } from "../../components/login-form"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NavBar } from "@/components/navbar"

export default function Home() {

  return (
    <div className="flex flex-col h-screen">
      <NavBar navLocation="create-account" isLoginPage={true} />
      <div className="flex flex-row h-full">
        <div className="mx-auto min-w-[440px] max-w-[560px] flex h-full flex-col justify-center align-center space-y-6 p-16">
          <div className="flex flex-col space-y-2">
            <h1 className="text-title text-black font-medium tracking-tight">
              Get started for free!
            </h1>
            <p className="text-black">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="text-black">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col max-md:hidden min-w-[320px] w-[60%] max-w-[720px] overflow-clip bg-primary-foreground">
          <StylisticPreviews />
        </div>
      </div>
    </div>
  )
}