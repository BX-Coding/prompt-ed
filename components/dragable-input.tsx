import { FC } from "react"
import { Input } from "./ui/input"
import { DragHandleDots2Icon } from '@radix-ui/react-icons'

type DragableInputProps = {
}

export const DragableInput: FC<DragableInputProps> = ({ }) => {
    const size = 20
    return <div className="flex flex-row items-center bg-secondary text-foreground p-1 rounded-md">
        <DragHandleDots2Icon className="cursor-move text-secondary-foreground" style={{height:size, width:size}}/>
        <Input type="text" title="Free Input"/>
    </div>
}