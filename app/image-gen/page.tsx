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

interface UserImage {
  url:string
  date:string
  prompt:string | undefined
}

export default function Home() {

  const [logIn, setLogIn] = useState(false);
  const [userGeneratedImages, setUserGeneratedImages] = useState<UserImage[]>([])
  const [loadedImage, setLoadedImage] = useState<UserImage>()
  const [userID, setUserID] = useState(auth.currentUser?.uid);

  const updateUserGeneratedImages = (image:UserImage) => {
    setUserGeneratedImages((oldArray)=>([image,...oldArray ]))
  }

  onAuthStateChanged(auth, (user) => {
    if (user && !logIn) {
      setLogIn(true);
    }
    if (user && typeof userID === 'undefined') {
      setUserID(user.uid);
    }
  });

  React.useEffect(()=>{
    const getUserImages = async (folderName: string | undefined): Promise<void> => {
      const folderRef: StorageReference = ref(storage, folderName);
      const savedUserImages: UserImage[] = [];
    
      try {
        const result: ListResult = await listAll(folderRef);
    
        const urlPromises: Promise<UserImage>[] = result.items.map(async (itemRef: StorageReference) => {
          const url = await getDownloadURL(itemRef);
          const metadata: FullMetadata = await getMetadata(itemRef);
          const date = metadata.timeCreated; 
          const prompt = metadata.customMetadata?.prompt
          return { url, date, prompt};
        });
    
        const userImages: UserImage[] = await Promise.all(urlPromises);
        userImages.reverse()
        savedUserImages.push(...userImages);
      } catch (error) {
        console.error("Error getting image URLs:", error);
      }
      
      setUserGeneratedImages(savedUserImages);
    };

    getUserImages(auth.currentUser?.uid)
  },[userID])

  function formatISODate(isoDateString: string): string {
    const date = new Date(isoDateString);
  
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
  
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    const day = date.getDate();
    const suffix = getDaySuffix(day);

    if(formattedDate.replace(day.toString(), `${day}${suffix}`)==="Invalid Date"){
      return isoDateString
    }

    return formattedDate.replace(day.toString(), `${day}${suffix}`);
  }
  
  function getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

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
                      {formatISODate(image.date)}
                    </p>
                    <div className="flex flex-row py-[18px]">
                      <p className="flex-1 text-lg text-white">
                        {image.prompt}
                      </p>
                      <Button
                        onClick={()=>{
                          setLoadedImage({url:image.url,date:image.date,prompt:image.prompt})
                        }}
                      variant="accent">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16" style={{color:'black'}}>
                          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                        </svg>
                      </Button>
                    </div>
                  </div>
                  ))}
                </ScrollArea>
              </>},
            ]} defaultValue="Image History" />
          <div className="flex flex-col items-center w-full px-12 py-6">
            <ImageGeneration updateUserGeneratedImages={updateUserGeneratedImages} loadedImage={loadedImage}/>
          </div>
        </div>
      </div>
    );
  }
}