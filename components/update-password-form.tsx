"use client"

import * as React from "react"

import { useCallback, useState } from 'react';
import { Icons } from "@/components/icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { getAuth, updatePassword } from 'firebase/auth'
import { toast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { CloseIcon } from "./icons/prompt-ed-icons";

export interface UpdatePasswordProps { className?: string, onClose: () => void};

export const UpdatePassword: React.FC<UpdatePasswordProps> = ({className, onClose, ...props}: UpdatePasswordProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const router = useRouter();

  const checkPasswordMatch = useCallback((password: string) => {
    setPasswordsMatch(password == password2);
  }, [password2]);

  const checkPasswordMatch2 = useCallback((password2: string) => {
    setPasswordsMatch(password == password2);
  }, [password]);

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
        onClose();
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
    <div className={"absolute w-full h-full flex flex-col items-center pt-[calc(30vh)] bg-[rgba(0,0,0,0.2)] " + className}>
      <div className="grid bg-card-solid p-6 pt-2 rounded-xl">
        <Button variant="ghost" className="justify-self-end w-2.5 p-0" onClick={onClose}><CloseIcon /></Button>
        <form className="grid gap-1" onSubmit={submitHandler}>
          <p className="font-normal text-input opacity-60">New Password</p>
          <Input
            id="password"
            type="password"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            onChange={(e) => { setPassword(e.target.value); checkPasswordMatch(e.target.value); }}
            disabled={isLoading}
            className="mr-2"
            inputSize="lg"
          />
          <p className="font-normal text-input opacity-60 mt-2">Confirm New Password</p>
          <Input
            id="confirm-password"
            type="password"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            onChange={(e) => { setPassword2(e.target.value); checkPasswordMatch2(e.target.value); }}
            disabled={isLoading}
            className="mr-2"
            inputSize="lg"
          />
          
          {password.length>0 || password2.length>0 ?(<p className={"text-[#EB4940] text-input" + (passwordsMatch ? " hidden" : "")}>Passwords do not match.</p>):(null)}
          <Button className="mt-1" size="lg" disabled={isLoading || !passwordsMatch}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Change password
          </Button>
        </form>
      </div>
    </div>
  );
}