"use client"

import * as React from "react"

import {useState} from 'react';
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { getAuth, updatePassword } from 'firebase/auth'
import { auth } from '../app/firebase'
import { Toaster } from "@/components/ui/toaster"
import { toast, useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

export const UpdatePassword: React.FC = ({}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [password, setPassword] = useState('');
    const router = useRouter();

    const auth = getAuth();
    async function submitHandler(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        const user = auth.currentUser;
        const newPassword = password;
    
        if (user !== null) {
          await updatePassword(user, newPassword).then(() => {
            toast({
              title: "Password Updated",
            });
            setIsLoading(false);
          }).catch((error) => {
            toast({
              title: "Account Timeout",
              description: "Please login then try again"
            });
            console.log(error);
            router.push("/login");
            setIsLoading(false);
          });
        }
        setTimeout(() => {
          setIsLoading(false)
        }, 3000)
      }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex max-w-md items-center">
        <Input
                id="password"
                placeholder=""
                type="password"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="mr-5"
              />
        <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
        </Button>
        </div>
      </form>
      <Toaster />
    </>
  );
}