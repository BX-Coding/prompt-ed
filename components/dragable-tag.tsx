import { FC } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { DragHandleDots2Icon } from '@radix-ui/react-icons'

type DragableTagProps = {
    placeholder?: string
    selectOptions: string[]
    onChange?: (value: string) => void
}

export const DragableTag: FC<DragableTagProps> = ({ onChange, placeholder, selectOptions }) => {
    const size = 20

    const handleChange = (value: string) => {
        if (!onChange) return
        onChange(value)
    }

    return <div className="flex flex-row items-center bg-secondary text-foreground p-1 rounded-md">
        <DragHandleDots2Icon className="cursor-move text-secondary-foreground" style={{height:size, width:size}}/>
        <Select onValueChange={handleChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {selectOptions.map((option, index) => {
                    return <SelectItem key={index} value={option}>{option}</SelectItem>
                })}
            </SelectContent>
        </Select>
    </div>
}