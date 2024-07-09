import * as React from "react";

import { useCallback, useEffect, useRef, useState } from "react";
import { auth, storage, db } from "@/app/firebase";
import { ImageHistory } from "./image-history";
import { onAuthStateChanged } from "firebase/auth";
import {
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  StorageReference,
  ListResult,
  FullMetadata,
} from "firebase/storage";
import { Input } from "./ui/input";
import { SearchIcon } from "./icons/prompt-ed-icons";

interface UserImage {
  url: string;
  date: string;
  formattedDate: string;
  prompt: string | undefined;
  objectName: string;
}

export const ImageHistoryBox = () => {
  const [userID, setUserID] = useState(auth.currentUser?.uid);
  const [userGeneratedImages, setUserGeneratedImages] = useState<UserImage[]>(
    []
  );

  const [searchText, setSearchText] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user && typeof userID === "undefined") {
      setUserID(user.uid);
    } else {
    }
  });

  React.useEffect(() => {
    const getUserImages = async (
      folderName: string | undefined
    ): Promise<void> => {
      const folderRef: StorageReference = ref(storage, folderName);
      const savedUserImages: UserImage[] = [];

      try {
        const result: ListResult = await listAll(folderRef);

        const urlPromises: Promise<UserImage>[] = result.items.map(
          async (itemRef: StorageReference) => {
            const url = await getDownloadURL(itemRef);
            const metadata: FullMetadata = await getMetadata(itemRef);
            const date = metadata.timeCreated;
            const formattedDate = formatDate(date);
            const prompt = metadata.customMetadata?.prompt;
            const objectName = itemRef.name;

            return { objectName, url, date, formattedDate, prompt };
          }
        );

        const userImages: UserImage[] = await Promise.all(urlPromises);
        userImages.reverse();
        savedUserImages.push(...userImages);
      } catch (error) {
        console.error("Error getting image URLs:", error);
      }

      setUserGeneratedImages(savedUserImages);
    };

    getUserImages(auth.currentUser?.uid);
  }, [userID]);


  function formatDate(dateString: string): string {
    console.log("test");
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

  const shouldDisplay = useCallback((prompt_raw: string, date_raw: string) => {
    if (searchText == "") {
      return true;
    } else {
      const prompt = prompt_raw.toLowerCase();
      const date = date_raw.toLowerCase();

      const parts = searchText.toLowerCase().split(" ");

      for (const part of parts) {
        if (prompt.includes(part) || date.includes(part)) {

        } else {
          return false;
        }
      };

      return true;
    }
  }, [searchText]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex self-end w-[400px] items-center gap-2">
        <div className="relative -mr-2">
          <div className="absolute left-[18px] -bottom-[11.5px]">
            <SearchIcon className="w-[21px] h-[21px]" />
          </div>
        </div>
        <Input onChange={(e) => setSearchText(e.target.value)} inputSize="search" className="bg-transparent border-2 border-secondary pl-[49px]" placeholder="Search Library" />
      </div>
      <div className={"grid gap-4 min-[716px]:grid-cols-2 xl:grid-cols-3 min-[1680px]:grid-cols-4 min-[2100px]:grid-cols-5"}>
        {userGeneratedImages.map((val, key) => (
          <div key={key} hidden={!shouldDisplay(val.prompt || "", val.formattedDate)}>
            <ImageHistory
              url={val.url}
              key={key}
              prompt={val.prompt}
              date={val.date}
              formattedDate={val.formattedDate}
              objectName={val.objectName}
              userId={userID}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
