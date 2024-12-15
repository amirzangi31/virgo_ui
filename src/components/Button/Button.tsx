import React, { ReactNode, useCallback } from 'react'

import { VariantProps, cva } from "class-variance-authority";
import cn from '../../utils/cnFun';

type variant = "primary" | "warning" | "danger" | "inverse" | "success" | "purple" | "default";
type size = "sm" | "md" | "lg"
type rounded = "sm" | "md" | "lg" | "full"

type ButtonVariantsProps = {
      variant?: variant;
      size?: size
      rounded?: rounded
}


type ButtonProps = ButtonVariantsProps & {
      classname?: string;
      children: React.ReactNode;
      onClick?: () => void,
      isLoading?: boolean
      isDisabled?: boolean
}


type ButtonVariantsFunction = (props: ButtonVariantsProps) => string;

const ButtonVariants: ButtonVariantsFunction = cva(
      "flex justify-center items-center gap-2  transition-all duration-300 min-w-[100px] w-full  cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none",
      {
            variants: {
                  variant: {
                        primary:
                              "bg-primary hover:bg-white text-white hover:text-primary hover:border hover:border-primary",
                        warning:
                              "bg-yellow-500 hover:bg-white text-white hover:text-yellow-500 hover:border hover:border-yellow-500",
                        danger:
                              "bg-red-500 hover:bg-red-600 text-orange-100 hover:text-white",
                        inverse:
                              "bg-gray-600 hover:bg-gray-700 text-blue-100 hover:text-white",
                        success:
                              "bg-green-600 hover:bg-green-700 text-teal-100 hover:text-white",
                        purple:
                              "bg-indigo-700 hover:bg-indigo-800 text-white",
                        default:
                              "bg-gray-500 hover:bg-gray-600",
                  },
                  size: {
                        sm: "px-2 py-2",
                        md: "px-4 py-2",
                        lg: "px-6 py-2"
                  },
                  rounded: {
                        sm: "rounded-sm",
                        md: "rounded-md",
                        lg: "rounded-lg",
                        full: "rounded-full"
                  }
            },

            defaultVariants: {
                  variant: "default", // will be used if we won't pass any prop for intent
                  size: "sm"
            },
      }
);



export default function Button({
      variant,
      size,
      rounded,
      classname = "",
      children,
      onClick,
      isLoading,
      isDisabled
}: ButtonProps): JSX.Element {
      return (
            <button onClick={onClick} disabled={isDisabled} className={cn(ButtonVariants({
                  variant, size,
                  rounded
            }), classname)}>{isLoading ? "loading ..." : children}</button>
      )
}

