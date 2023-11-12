import { FC } from "react"
import { usePromptEditorState } from "@/store/editorStore"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"  
import { Cross2Icon } from "@radix-ui/react-icons"
  

type BuildableContextMenuProps = {
    id: string
    children?: React.ReactNode[] | React.ReactNode
}

export const BuildableContextMenu: FC<BuildableContextMenuProps> = ({ id, children }) => {
    const removeBuildable = usePromptEditorState((state) => state.removeBuildable)
    
    return (
        <ContextMenu>
            <ContextMenuTrigger>{children}</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={() => {removeBuildable(id)}} className="flex flex-row space-2-x"><Cross2Icon/><span>Delete</span></ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
  
}