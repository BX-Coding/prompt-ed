import { FC } from "react"
import { Input } from "./ui/input"
import { DragHandleDots2Icon } from '@radix-ui/react-icons'

type DragableInputProps = {
    onChange?: (value: string) => void
}

export const DragableInput: FC<DragableInputProps> = ({ onChange }) => {
    const size = 20

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!onChange) return
        onChange(event.target.value)
    }

    return <div className="flex flex-row items-center bg-secondary text-foreground p-1 rounded-md">
        <DragHandleDots2Icon className="cursor-move text-secondary-foreground" style={{height:size, width:size}}/>
        <Input onChange={handleChange} type="text" title="Free Input"/>
    </div>
}