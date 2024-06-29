"use client"

import { NavBar } from "@/components/navbar"
import { onAuthStateChanged} from "firebase/auth";
import { useState } from "react";
import React from "react";
import { ImageGeneration } from "@/components/image-generation";
import { auth, storage } from "../firebase";
import { TabbedSidebar } from "@/components/tabbed-sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ref, listAll, getDownloadURL, getMetadata, StorageReference, ListResult, FullMetadata } from "firebase/storage";

interface UserImage{
  url:string
  date:string
  prompt:string | undefined
}

interface ImageMetaData extends FullMetadata{
  prompt:string
}

export default function Home() {

  const [logIn, setLogIn] = useState(false);
  const [userGeneratedImages, setUserGeneratedImages] = useState<UserImage[]>([])

  onAuthStateChanged(auth, (user) => {
    if (user && !logIn) {
      setLogIn(true);
    }
  });

  React.useEffect(()=>{
    const getUserImages = async (folderName: string | undefined): Promise<void> => {
      const folderRef: StorageReference = ref(storage, folderName);
      const imageUrls: UserImage[] = [];
    
      try {
        const result: ListResult = await listAll(folderRef);
    
        const urlPromises: Promise<UserImage>[] = result.items.map(async (itemRef: StorageReference) => {
          const url = await getDownloadURL(itemRef);
          const metadata: FullMetadata = await getMetadata(itemRef);
          const date = metadata.timeCreated; // Assuming the metadata includes a 'timeCreated' property
          const prompt = metadata.customMetadata?.prompt
          return { url, date, prompt};
        });
    
        const userImages: UserImage[] = await Promise.all(urlPromises);
        imageUrls.push(...userImages);
      } catch (error) {
        console.error("Error getting image URLs:", error);
      }
      
      setUserGeneratedImages(imageUrls);
    };

    getUserImages(auth.currentUser?.uid)
  },[])


  if (!logIn) {
    return (
      <p>Access Denied</p>
    );
  } else {
    return (
      <div className="flex flex-col h-screen">
        <NavBar navLocation="images"/>
        <div className="flex flex-row h-[calc(100vh-90px)]">
          <TabbedSidebar noCard={true} tabs={[
            {name: "Image History", content: 
              <>
                <div className="w-full px-4 pt-[30px]">
                  <p className="text-title-xl font-bold text-white">
                      Image History
                  </p>
                </div>
                <ScrollArea type="auto" className="max-h-[calc(100vh-348px)] w-full px-4">
                  {userGeneratedImages.map((image,key)=>(
                    <div className="mt-[30px] h-[92px] w-full border-b border-primary" key={key}>
                    <p className="text-[15px] text-primary">
                      {image.date}
                    </p>
                    <div className="flex flex-row py-[18px]">
                      <p className="flex-1 text-lg text-white">
                        {image.prompt}
                      </p>
                      <Button variant="accent"></Button>
                    </div>
                  </div>
                  ))}
                </ScrollArea>
              </>},
            ]} defaultValue="Image History" />
          <div className="flex flex-col items-center w-full px-12 py-6">
            <ImageGeneration />
          </div>
        </div>
      </div>
    );
  }
}