import { FC } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";

export const LoginButton: FC = ({}) => {
  const navigate = useNavigate();


  const onLoginClick = () => {
    console.log("login");
    navigate('/login');
    navigate(0);
  }

  return (
    <div className="flex flex-col items-left bg-primary text-foreground p-1 rounded-md">
      <Button onClick={onLoginClick}><p>Login</p></Button>
    </div>
  );
};
