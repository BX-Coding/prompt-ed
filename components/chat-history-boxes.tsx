import * as React from "react"

import { FC, useEffect, useState } from 'react';
import { auth, db } from "@/app/firebase";
import { ChatHistory } from "./chat-history";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, collection, getDocs, QuerySnapshot, DocumentData, CollectionReference, query } from "firebase/firestore";

export const ChatHistoryBox: FC = ({}) => {
    const [userID, setUserID] = useState(auth.currentUser?.uid);
    const [userChats, setUserChats] = useState<DocumentData[]>([])

    onAuthStateChanged(auth, (user) => {
        if (user && typeof userID === 'undefined') {
          setUserID(user.uid);
        } else {
        }
      });


    useEffect(()=>{

        const getUserChats = async (userId: string | undefined): Promise<void> => {
            const pathName = "users/" + userId + "/chats"
            const collectionRef = query(collection(db, pathName));
            const chats: DocumentData[] = [];
        
            try {
            const querySnapshot: QuerySnapshot = await getDocs(collectionRef);
        
            querySnapshot.forEach((doc) => {
                chats.unshift({ date: doc.id, chat : doc.data().messages.map((item:string) => JSON.parse(item))});
            });
            } catch (error) {
            console.error("Error getting documents:", error);
            }
            console.log(chats)
            setUserChats(chats)
        }

        getUserChats(auth.currentUser?.uid)

    },[userID])

    return (
        <div className="mb-5 h-full">
            {userChats.map((val,key)=>(
                <div className="mb-5" key={key}><ChatHistory key={key} prompt={val.chat[0].content} date={(val.date)}/></div>
            ))}
        </div>
    )
}