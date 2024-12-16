import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';
type IconButtonVariantsProps = {
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'full';
  color?: "primary" | "secondary" | "warning" | "danger" | "inverse" | "success" | "purple" | "default" | "white";
  svgColor?: "primary" | "secondary" | "warning" | "danger" | "inverse" | "success" | "purple" | "default" | "white"
};
const IconButtonBack = cva(
  "flex justify-center items-center cursor-pointer transition-all duration-300",
  {
    variants: {
      size: {
        sm: "w-[2rem] h-[2rem]",
        md: "w-[2.5rem] h-[2.5rem]",
        lg: "w-[3rem] h-[3rem]",
      },
      rounded: {
        full: "rounded-full",
        md: "rounded-md",
        sm: "rounded-sm",
      },
      color: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        warning: "bg-warning",
        danger: "bg-error",
        inverse: "bg-gray-600",
        success: "bg-success",
        purple: "bg-purple-500",
        default: "bg-gray-500",
        white: "bg-white"
      },
      svgColor: {
        primary: "stroke-primary",
        secondary: "stroke-secondary",
        warning: "stroke-warning",
        danger: "stroke-error",
        inverse: "stroke-gray-600",
        success: "stroke-success",
        purple: "stroke-purple-500",
        default: "stroke-gray-500",
        white: "stroke-white"
      }
    },
    defaultVariants: {
      size: "md",
      rounded: "full",
      color: "white",
      svgColor: "primary"
    },
  }
);



type IconButtonProps = IconButtonVariantsProps & {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

export default function IconButton({
  size,
  rounded,
  color,
  onClick,
  children,
  className = "",
  svgColor
}: IconButtonProps): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={cn(IconButtonBack({ size, rounded, color }), className)}
    >
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1L8.5 8L1.5 15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className={cn(
          "stroke-primary",
          IconButtonBack({ svgColor })
        )}

      ></path></svg>
      {children}
    </div>
  );
}
