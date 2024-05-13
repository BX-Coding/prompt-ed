"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Link from "next/link"
import { ResetForm } from "../../components/login-form"
import { cn } from "@/lib/utils"

export default function Home() {

  return (
    <>
      <BrowserRouter>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Password Reset
              </h1>
              <p>
                Enter your email
              </p>
            </div>
            <ResetForm />
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}