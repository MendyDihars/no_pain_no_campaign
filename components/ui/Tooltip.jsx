'use client';

import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@root/components/ui/tooltip-primtive";

export default function Tooltip({ children, content, contentProps, rootProps }) {
  return (
    <TooltipProvider>
      <TooltipPrimitive {...rootProps}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent {...contentProps}>
          {content}
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
}
