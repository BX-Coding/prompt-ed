"use client"

import * as React from "react"

import { Button } from "./ui/button"
import { CloseIcon } from "./icons/prompt-ed-icons";

export interface UserDetailsProps { className?: string, email: string, onClose: () => void};

export const UserDetails: React.FC<UserDetailsProps> = ({className, email, onClose, ...props}: UserDetailsProps) => {
  return (
    <div className={"absolute w-full h-full flex flex-col items-center pt-[calc(30vh)] bg-[rgba(0,0,0,0.2)] " + props}>
      <div className="grid bg-card-solid p-6 pt-2 rounded-xl">
        <Button variant="ghost" className="justify-self-end w-2.5 p-0" onClick={onClose}><CloseIcon /></Button>
        <div className="grid gap-1">
          <p className="text-title">Email:</p>
          <p className="text-input">{email}</p>
        </div>
      </div>
    </div>
  );
}