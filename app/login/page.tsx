"use client"
import Link from "next/link"
import { LoginForm } from "../../components/login-form"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function Home() {

  return (
    <>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Link
          href="/create-account"
          className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
          )}
          >
          Create Account
          </Link>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome!
            </h1>
            <p>
              Enter your email and password to login
            </p>
          </div>
          <LoginForm />
          <p>
            Struggling with logging in? {" "}
            <Link
              href="/password-reset"
              className="underline underline-offset-4 hover:text-primary"
            >
              Reset Password
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  )
}