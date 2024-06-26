import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-input ring-offset-background transition-colors " + 
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " + 
  "disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-button-default-text active:enabled:shadow-[0_0_0_2px_rgba(239,64,1,0.25)]",
        accent: "bg-accent text-button-accent-text active:enabled:shadow-[0_0_0_2px_rgba(239,64,1,0.25)]",
        destructive:
          "bg-destructive text-button-destructive-text active:enabled:shadow-[0_0_0_2px_rgba(239,64,1,0.25)]",
        outline:
          "border border-input bg-primary-hover-light text-button-default-text active:enabled:shadow-[0_0_0_2px_rgba(239,64,1,0.25)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        navbar: "bg-card-solid hover:bg-primary-hover-light",
      },
      size: {
        default: "h-input px-3 py-1.5",
        sm: "h-5 rounded-md px-2 py-1 text-sm",
        lg: "h-9 rounded-md px-4 text-base",
        xl: "h-11 rounded-md px-5 text-xl font-semibold",
        navbar: "w-nav-bar-button h-nav-bar-button rounded-[5px] text-nav-bar font-medium",
        "navbar-square": "w-nav-bar-button-square h-nav-bar-button rounded-[5px] text-nav-bar font-medium",
        icon: "h-input w-input",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
