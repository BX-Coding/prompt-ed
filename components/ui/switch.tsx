import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
    cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center border-2",
        "border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-secondary data-[state=unchecked]:bg-primary-hover-heavy"),
    {
        variants: {
            size: {
                default: "h-5 w-9 rounded-md",
                small: "h-3 w-5 rounded-sm",
                large: "h-input w-13 rounded-md",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

const switchThumbVariants = cva(
    "pointer-events-none block bg-white shadow-lg ring-0 transition-transform",
    {
        variants: {
            size: {
                default: "h-4 w-4 rounded-sm data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
                small: "h-2.5 w-[9px] rounded-xs data-[state=checked]:translate-x-2 data-[state=unchecked]:translate-x-[-1px]",
                large: "h-[23px] w-[23px] rounded-sm data-[state=checked]:translate-x-[25px] data-[state=unchecked]:translate-x-0",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

export interface SwitchProps
  extends React.ButtonHTMLAttributes<React.ElementRef<typeof SwitchPrimitives.Root>>,
    VariantProps<typeof switchVariants> {
  asChild?: boolean
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ size, className }))}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(switchThumbVariants({ size, className }))}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
