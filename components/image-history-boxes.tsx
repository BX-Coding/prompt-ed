import * as React from "react";

import { useState } from "react";
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

interface UserImage {
  url: string;
  date: string;
  prompt: string | undefined;
  objectName: string;
}

export const ImageHistoryBox = () => {
  const [userID, setUserID] = useState(auth.currentUser?.uid);
  const [userGeneratedImages, setUserGeneratedImages] = useState<UserImage[]>(
    []
  );

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
            const prompt = metadata.customMetadata?.prompt;
            const objectName = itemRef.name;

            return { objectName, url, date, prompt };
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

  return (
    <div className="columns-3xs gap-4 space-y-4">
      {userGeneratedImages.map((val, key) => (
        <ImageHistory
          url={val.url}
          key={key}
          prompt={val.prompt}
          date={val.date}
          objectName={val.objectName}
          userId={userID}
        />
      ))}
    </div>
  );
};
