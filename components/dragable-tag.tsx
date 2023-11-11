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
}

export const DragableTag: FC<DragableTagProps> = ({ placeholder, selectOptions }) => {
    const size = 20
    return <div className="flex flex-row items-center bg-secondary text-foreground p-1 rounded-md">
        <DragHandleDots2Icon className="cursor-move text-secondary-foreground" style={{height:size, width:size}}/>
        <Select>
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