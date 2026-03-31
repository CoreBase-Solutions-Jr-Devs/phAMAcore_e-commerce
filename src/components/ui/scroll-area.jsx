import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

function ScrollArea({ className, children, ...props }) {
    return (
        <ScrollAreaPrimitive.Root
            data-slot="scroll-area"
            className={cn("overflow-hidden", className)}
            {...props}
        >
            <ScrollAreaPrimitive.Viewport
                data-slot="scroll-area-viewport"
                className="size-full rounded-[inherit]"
            >
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar />
        </ScrollAreaPrimitive.Root>
    )
}

function ScrollBar({ className, orientation = "vertical", ...props }) {
    return (
        <ScrollAreaPrimitive.Scrollbar
            data-slot="scroll-area-scrollbar"
            orientation={orientation}
            className={cn(
                "flex touch-none select-none transition-colors",
                orientation === "vertical" && "h-full w-2 border-l border-l-transparent p-px",
                orientation === "horizontal" && "h-2 flex-col border-t border-t-transparent p-px",
                className
            )}
            {...props}
        >
            <ScrollAreaPrimitive.Thumb
                data-slot="scroll-area-thumb"
                className="relative flex-1 rounded-full bg-[var(--color-main)]"
            />
        </ScrollAreaPrimitive.Scrollbar>
    )
}

export { ScrollArea, ScrollBar }