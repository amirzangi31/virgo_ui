import React, { ReactNode, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils";
import { ColorType, RoundedType, SizeType } from "../../types/GlobalType";

type variant = ColorType;
type size = SizeType;
type rounded = RoundedType;
type position =
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"
  | "top-right"
  | "top-center"
  | "top-left";

type backgroundEffect = "opaque" | "blur" | "transparent";

const PopoverVariants = cva("absolute z-10 flex flex-col items-center", {
  variants: {
    variant: {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      warning: "bg-warning text-black",
      danger: "bg-error text-white",
      success: "bg-success text-white",
      inverse: "bg-gray-600 text-white",
      purple: "bg-purple-500 text-white",
      default: "bg-gray-500 text-white",
      white: "bg-white text-black",
    },
    size: {
      sm: "text-sm py-2",
      md: "text-base p-3",
      lg: "text-lg p-4",
    },
    rounded: {
      sm: "rounded-[0.25rem]",
      md: "rounded-[0.625rem]",
      lg: "rounded-[1.125rem]",
      full: "rounded-[2.1875rem]",
    },
    position: {
      "bottom-right": "top-full left-auto right-0 mt-2",
      "bottom-center": "top-full left-1/2 transform -translate-x-1/2 mt-2",
      "bottom-left": "top-full left-0 mt-2",
      "top-right": "bottom-full left-auto right-0 mb-2",
      "top-center": "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
      "top-left": "bottom-full left-0 mb-2",
      "top-start": "bottom-full left-0 mb-2",
      "top": "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
      "top-end": "bottom-full right-0 mb-2",
      "bottom-start": "top-full left-0 mt-2",
      "bottom": "top-full left-1/2 transform -translate-x-1/2 mt-2",
      "bottom-end": "top-full right-0 mt-2",
      "right-start": "left-full top-0 ml-2",
      "right": "left-full top-1/2 transform -translate-y-1/2 ml-2",
      "right-end": "left-full bottom-0 mb-2 ml-2",
      "left-start": "right-full top-0 mr-2",
      "left": "right-full top-1/2 transform -translate-y-1/2 mr-2",
      "left-end": "right-full bottom-0 mb-2 mr-2",
    },
    backgroundEffect: {
      opaque: "opacity-100",
      blur: "backdrop-blur-sm bg-opacity-75",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    rounded: "md",
    position: "bottom-center",
    backgroundEffect: "opaque",
  },
});

type PopoverProps = {
  children: React.ReactNode;
  content: ReactNode;
  variant?: variant;
  size?: size;
  rounded?: rounded;
  position?: position;
  backgroundEffect?: backgroundEffect;
  className?: string;
};

const Popover = ({
  children,
  content,
  variant,
  size,
  rounded,
  position,
  backgroundEffect,
  className,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopover = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block">
      <div onClick={togglePopover} className="cursor-pointer">
        {children}
      </div>

      {isOpen && (
        <div
          className={cn(
            PopoverVariants({ variant, size, rounded, position, backgroundEffect }),
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
