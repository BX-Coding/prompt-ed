import { FC } from "react"
import { DimensionsIcon, InputIcon, ImageIcon, Pencil1Icon, FaceIcon, AngleIcon, TransparencyGridIcon, BlendingModeIcon } from '@radix-ui/react-icons'
import Image from "next/image"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { usePromptEditorState } from "@/store/editorStore"
import { BuildableTypes } from "./buildable"
import { artStyleTags, colorTags, emotionTags, genreTags, imageAngleTags, patternTags, sizeTags } from "@/lib/tags"
  

type BuildableMenuProps = {

}

export const BuildableMenu: FC<BuildableMenuProps> = ({ }) => {
    const addBuildable = usePromptEditorState((state) => state.addBuildable)
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="bg-accent h-[35px] w-[35px] rounded-xl flex items-center justify-center drop-shadow-md">
            <Image
                className="animate-bounce"
                src="/logo-stroke.svg"
                alt="Logo"
                width={32}
                height={32}
            />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuLabel>Add Block</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => addBuildable(BuildableTypes.FREE_INPUT, "")} className="flex flex-row space-x-1">
                <InputIcon/><span>Free Input</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBuildable(BuildableTypes.TAG, "", sizeTags)} className="flex flex-row space-x-1">
                <DimensionsIcon/> <span>Size</span> 
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBuildable(BuildableTypes.TAG, "", colorTags)} className="flex flex-row space-x-1">
                <BlendingModeIcon/> <span>Color</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBuildable(BuildableTypes.TAG, "", genreTags)} className="flex flex-row space-x-1">
                <ImageIcon/> <span>Genre</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBuildable(BuildableTypes.TAG, "", emotionTags)} className="flex flex-row space-x-1">
                <FaceIcon/> <span>Emotion</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBuildable(BuildableTypes.TAG, "", artStyleTags)} className="flex flex-row space-x-1">
                <Pencil1Icon/><span>Art Style</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBuildable(BuildableTypes.TAG, "", imageAngleTags)} className="flex flex-row space-x-1">
                <AngleIcon/><span>Image Angle</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBuildable(BuildableTypes.TAG, "", patternTags)} className="flex flex-row space-x-1">
                <TransparencyGridIcon/><span>Pattern</span>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
  
}