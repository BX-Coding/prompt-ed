"use client";

import * as React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { storage } from "@/app/firebase";
import { deleteObject, ref } from "firebase/storage";
import { EditIcon, XIcon } from "./icons/prompt-ed-icons";
import { ImageDeleteAlert } from "./image-delete-alert";

interface ImageHistoryProps {
  date: string;
  formattedDate: string;
  prompt: string | undefined;
  url: string;
  objectName: string;
  userId: string | undefined;
}

export function ImageHistory({
  date,
  formattedDate,
  prompt,
  url,
  objectName,
  userId,
}: ImageHistoryProps) {
  const [deleted, setDeleted] = useState(false);
  const onDelete = async () => {
    const deleteRef = ref(storage, `${userId}/${objectName}`);
    await deleteObject(deleteRef).catch(() => {
      console.log("Error deleting object");
    });
    setDeleted(true);
  };

  return (
    <>
      {deleted ? (
        <></>
      ) : (
        <div className="space-y-2 mb-4 content-start gap-0">
          <img className="rounded-lg" src={url} height="auto" />
          <div className="flex flex-row text-text-t2 text-chat gap-1">
            <p className="text-wrap"><p className="inline text-black font-md">{formattedDate}:</p> {prompt}</p>
            <div className="flex-1" />
            <Link href={{ pathname: "/image-gen", query: { date: date } }}>
              <Button variant="accent" size="lg" className="flex flex-none h-[31px] w-[31px] rounded-lg p-1">
                <EditIcon className="w-[21px] h-[21px] text-primary" />
              </Button>
            </Link>
            <ImageDeleteAlert onConfirm={onDelete} onDeny={() => {}} />
          </div>
        </div>
      )}
    </>
  );
}