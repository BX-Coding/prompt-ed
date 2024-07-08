import { FC, use, useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { DragHandleDots2Icon } from '@radix-ui/react-icons'

type DragableTagProps = {
    initialValue?: string
    selectOptions: string[]
    onChange?: (value: string) => void
}

export const DragableTag: FC<DragableTagProps> = ({ onChange, initialValue, selectOptions }) => {
    const size = 20

    const handleChange = (value: string) => {
        if (!onChange) return
        onChange(value)
    }

    return <div className="flex flex-row items-center bg-secondary text-foreground p-1 rounded-md">
        <DragHandleDots2Icon className="cursor-move text-secondary-foreground h-5 w-5" width={size} height={size}/>
        <Select defaultValue={initialValue} onValueChange={handleChange}>
            <SelectTrigger className="focus:ring-inset">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {selectOptions.map((option, index) => {
                    return <SelectItem key={index} value={option}>{option}</SelectItem>
                })}
            </SelectContent>
        </Select>
    </div>
}