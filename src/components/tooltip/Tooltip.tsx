import { cva } from 'class-variance-authority';
import React, { ReactNode } from 'react'
import { ColorType, RoundedType, SizeType } from '../../types/GlobalType';
import { cn } from '../../utils';





type variant = ColorType
type size = SizeType
type rounded = RoundedType
type position = "bottom-right" | "bottom-left" | "bottom-center" | "top-right" | "top-center" | "top-left"


type TooltipVariantsProps = {
      variant?: variant;
      size?: size
      rounded?: rounded
      position?: position
      color?: variant
}


type TooltipProps = TooltipVariantsProps & {
      className?: string;
      children: React.ReactNode;
      content?: ReactNode
}


type TooltipVariantsFunction = (props: TooltipVariantsProps) => string;





const TooltipVariants: TooltipVariantsFunction = cva(
      "absolute text-md text-white min-w-[6.25rem] text-center",
      {

            variants: {
                  variant: {
                        primary: "bg-primary",
                        secondary: "bg-secondary",
                        warning: "bg-warning",
                        danger: "bg-error",
                        success: "bg-success",
                        inverse: "bg-inverse-600",
                        purple: "bg-purple-500",
                        default: "bg-gray-500",
                        white: "bg-white",
                  },
                  color: {
                        primary: "text-primary",
                        secondary: "text-secondary",
                        warning: "text-warning",
                        danger: "text-error",
                        success: "text-success",
                        inverse: "text-inverse-600",
                        purple: "text-purple-500",
                        default: "text-gray-500",
                        white: "text-white",
                  },
                  size: {
                        sm: "py-1",
                        md: "py-2",
                        lg: "py-3",
                  },
                  rounded: {
                        sm: "rounded-sm",
                        md: "rounded-md",
                        lg: "rounded-lg",
                        full: "rounded-full",
                  },
                  position: {
                        "bottom-right": "opacity-0  group-hover:opacity-100 group-hover:top-[calc(100%+0.25rem)] left-full",
                        "bottom-center": "opacity-0  group-hover:opacity-100 group-hover:top-[calc(100%+0.25rem)] left-1/2 -translate-x-1/2",
                        "bottom-left": "opacity-0  group-hover:opacity-100 group-hover:top-[calc(100%+0.25rem)] right-full ",
                        "top-right": "opacity-0  group-hover:opacity-100 group-hover:bottom-[calc(100%+0.25rem)] left-full",
                        "top-center": "opacity-0  group-hover:opacity-100 group-hover:bottom-[calc(100%+0.25rem)] left-1/2 -translate-x-1/2",
                        "top-left": "opacity-0  group-hover:opacity-100 group-hover:bottom-[calc(100%+0.25rem)] right-full",
                  }
            },

            defaultVariants: {
                  rounded: "md",
                  size: "sm",
                  variant: "primary",
                  position: 'top-center',
                  color : "white"
            },
      }
);


const Tooltip = (props: TooltipProps) => {
      const { children, className, variant, size, rounded, content , position } = props
      return (
            <div className='relative  mx-auto group w-fit'>
                  <span className={cn(
                        TooltipVariants({ variant, size, rounded , position }),
                        className
                  )}>{content}</span>
                  {children}
            </div>
      )
}

export default Tooltip