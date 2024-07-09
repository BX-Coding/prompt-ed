import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { XIcon } from "./icons/prompt-ed-icons";

export const ImageDeleteAlert: React.FC<{
  onConfirm: () => void;
  onDeny: () => void;
}> = ({ onConfirm, onDeny }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex flex-none h-[31px] w-[31px] rounded-lg p-[9px] bg-destructive"><XIcon className="w-[13px] h-[13px] text-primary-foreground" /></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Once you delete this image, it can't be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDeny}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
