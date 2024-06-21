"use client"

import { NavBar } from "@/components/navbar"
import { UITestingGround } from "@/components/ui-testing-ground";
import { onAuthStateChanged} from "firebase/auth";
import { useState } from "react";
import React from "react";
import { ImageGeneration } from "@/components/image-generation";
import { auth } from "../firebase";

export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <NavBar/>
            <UITestingGround />
        </div>
    );
}