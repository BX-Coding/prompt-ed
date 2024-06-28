import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  cn(
    "flex border bg-card-solid px-2 py-1.5 text-input",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
    "disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:bg-[rgba(208,232,255,0.4)]",
    "enabled:hover:border-ring focus-visible:border-card-foreground invalid:border-destructive"),
  {
    variants: {
      inputSize: {
        default: "h-input w-full rounded-md",
        sm: "h-5 w-full rounded-md",
        lg: "h-9 px-3 w-full rounded-md text-base",
        xl: "h-[60px] w-full rounded-lg text-tabs p-[21px]",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ inputSize, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
