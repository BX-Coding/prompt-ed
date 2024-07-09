"use client";

import * as React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { storage } from "@/app/firebase";
import { deleteObject, ref } from "firebase/storage";
import { EditIcon, XIcon } from "./icons/prompt-ed-icons";

interface ImageHistoryProps {
  date: string;
  prompt: string | undefined;
  url: string;
  objectName: string;
  userId: string | undefined;
}

export function ImageHistory({
  date,
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

  function formatDate(dateString: string): string {
    console.log(objectName);
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    const formattedDate = date.toLocaleDateString("en-US", options);
    const day = date.getDate();
    const suffix = getDaySuffix(day);

    return formattedDate.replace(day.toString(), `${day}${suffix}`);
  }

  function getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return (
    <>
      {deleted ? (
        <></>
      ) : (
        <div className="min-w-64 grid space-y-2">
          <img className="rounded-lg" src={url} height="auto" />
          <div className="flex flex-row text-text-t2 text-chat gap-1">
            {formatDate(date)}: {prompt}
            <div className="flex-1" />
            <Link href={{ pathname: "/image-gen", query: { date: date } }}>
              <Button variant="accent" size="lg" className="h-[25px] w-[25px] rounded-lg p-1">
                <EditIcon className="w-[21px] h-[21px] text-primary" />
              </Button>
            </Link>
            <Button onClick={onDelete} variant="destructive" size="lg" className="h-[25px] w-[25px] rounded-lg p-[5px]">
              <XIcon className="w-[13px] h-[13px] text-destructive-foreground" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}