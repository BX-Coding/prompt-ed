"use client"

import { DragableInput } from "@/components/dragable-input"
import { DragableTag } from "@/components/dragable-tag"
import { PromptBox } from "@/components/prompt-box"
import { Button } from "@/components/ui/button"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import { PlusIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import axios from "axios";
import { useState } from "react"
import { ImageCard } from "@/components/image-card"
import { useLocalUrls } from "@/hooks/useLocalUrls"
import { usePromptEditorState } from "@/store/editorStore"
import { BuildableTypes } from "@/components/buildable"
import { usePrompt } from "@/hooks/usePrompt"
import { BuildableMenu } from "@/components/buildable-menu"
import { useHasHydrated } from "@/hooks/useHasHydrated"
import { ContentSection } from "@/components/content-section"
import { CurriculumScreen } from "@/components/curriculum-screen"
import { LoginButton } from "@/components/login-button"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function Home() {

  return (
    <>
      <p>
        Privacy is great!
      </p>
    </>
  )
}