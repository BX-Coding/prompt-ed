import * as React from "react"

import { FC, useEffect, useState } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { ChatHistory } from "./chat-history";
import { onAuthStateChanged } from "firebase/auth";

export const ChatHistoryBox: FC = ({}) => {
    const [dates, setDates] = React.useState<string[]>([]);
    const [userID, setUserID] = useState(auth.currentUser?.uid);

    onAuthStateChanged(auth, (user) => {
        if (user && typeof userID === 'undefined') {
          setUserID(user.uid);
        } else {
        }
      });


    const pathname = "users/" + userID +"/chats";
    useEffect(() => {
        const getDates = async () => {
            if (typeof userID !== 'undefined') {
                const querySnapshot = await getDocs(collection(db, pathname));
                const newDates = querySnapshot.docs.map((doc) => doc.id);
                setDates([...dates, ...newDates]);
            }
        }
        getDates();
    }, [userID]);

    console.log(dates);
    let dateEls = dates.map((date, index) => <div className="mb-5" key={index}><ChatHistory key={index} date={date}/></div>);

    return (
        <div className="mb-5 h-full" key={dates.length}>
            {dateEls}
        </div>
    )
}