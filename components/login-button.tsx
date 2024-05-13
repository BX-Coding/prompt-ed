import { FC, useEffect } from "react";
import React, {useState} from 'react';
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../app/firebase';
import {  signOut } from "firebase/auth";

export const LoginButton: FC = ({}) => {
  const navigate = useNavigate();
  const [text, setText] = useState("Login");

  const onLoginClick = () => {
    console.log("login");
    navigate('/login');
    navigate(0);
  }

  const onClick = () => {
    if (text == "Login") {
      onLoginClick();
    } else {
      handleLogOut();
    }
  }

  const handleLogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
          navigate("/");
          navigate(0);
          console.log("Signed out successfully")
      }).catch((error) => {
      // An error happened.
      });
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setText("Log Out");
      } else {
        console.log("user logged out");
        setText("Login");
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-left bg-primary text-foreground p-1 rounded-md">
      <Button onClick={onClick}><p>{ text }</p></Button>
    </div>
  );
};
