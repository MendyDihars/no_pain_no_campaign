'use client';

import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@root/components/ui/tooltip-primtive";

export default function Tooltip({ children, content, side, align, rootProps }) {
  return (
    <TooltipProvider>
      <TooltipPrimitive {...rootProps}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
}
