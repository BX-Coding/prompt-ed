"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
    colorScheme? : "blue" | "gray"
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, colorScheme = "gray", ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar colorScheme={colorScheme} />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export interface ScrollBarProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
    colorScheme : "blue" | "gray"
}

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = "vertical", colorScheme, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors rounded-full",
      colorScheme === "blue" &&
        "bg-[rgba(69,142,222,0.4)]",
      colorScheme === "gray" &&
        "bg-[rgb(44,44,44)]",
      orientation === "vertical" &&
        "h-full w-2 border-l border-l-transparent",
      orientation === "horizontal" &&
        "h-2 flex-col border-t border-t-transparent",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className={cn("relative flex-1 rounded-full",
      colorScheme === "blue" && "bg-[rgba(69,142,222,0.8)]",
      colorScheme === "gray" && "bg-[rgb(107,107,107)]")} />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
