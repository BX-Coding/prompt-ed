import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  cn(
    "flex border bg-card-solid px-2 py-1.5 text-input ring-offset-red-950",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
    "disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:bg-[rgba(208,232,255,0.4)]",
    "enabled:hover:border-ring focus-visible:border-card-foreground invalid:border-destructive",
    "focus-visible:outline-none focus-visible:border-ring"),
  {
    variants: {
      inputSize: {
        default: "h-input w-full rounded-md",
        sm: "h-5 w-full rounded-md",
        lg: "h-9 px-3 w-full rounded-md text-base",
        xl: "h-[60px] w-full rounded-lg text-tabs p-[21px]",
        search: "h-[40px] w-full rounded-card-contents text-xl px-4",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
)

/*"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",*/

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
