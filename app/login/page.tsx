"use client"
import Link from "next/link"
import { LoginForm } from "../../components/login-form"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { NavBar } from "@/components/navbar"

export default function Home() {


  return (
    <div className="flex flex-col h-screen">
      <NavBar navLocation="login" isLoginPage={true} />
      <div className="flex flex-row h-full">
        <div className="mx-auto flex w-1/2 h-full flex-col justify-center align-center space-y-6 sm:w-[350px]">
          <Link
          href="/create-account"
          className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
          )}
          >
          Create Account
          </Link>
          <div className="flex flex-col space-y-2">
            <h1 className="text-title text-black font-medium tracking-tight">
              Get started for free!
            </h1>
            <p>
              Log in to access your personalized dashboard and start generating amazing images!
            </p>
          </div>
          <LoginForm />
        </div>
        <div className="flex flex-col w-1/2 bg-primary-foreground">
        </div>
      </div>
    </div>
  )
}