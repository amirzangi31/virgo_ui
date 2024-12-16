import React, { ReactNode } from 'react'

import { cva } from "class-variance-authority";
import cn from '../../utils/cnFun';
import Loader from '../Loader/Loader';

type variant = "primary" | "primary_outlined" | "secondary" | "secondary_outlined" | "warning" | "warning_outlined" | "danger" | "danger_outlined" | "inverse" | "inverse_outlined" | "success" | "success_outlined" | "purple" | "purple_outlined" | "default" | "default_outlined";
type size = "sm" | "md" | "lg"
type rounded = "sm" | "md" | "lg" | "full"




type ButtonVariantsProps = {
      variant?: variant;
      size?: size
      rounded?: rounded
}


type ButtonProps = ButtonVariantsProps & {
      className?: string;
      children: React.ReactNode;
      onClick?: () => void,
      isLoading?: boolean
      isDisabled?: boolean
      loader?: ReactNode
}


type ButtonVariantsFunction = (props: ButtonVariantsProps) => string;

const ButtonVariants: ButtonVariantsFunction = cva(
      "flex justify-center items-center gap-2 px-4  transition-all duration-300 min-w-[180px]   cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none",
      {

            variants: {
                  variant: {
                        primary:
                              "bg-primary hover:bg-white text-white hover:text-primary hover:border hover:border-primary",
                        primary_outlined: "border border-primary bg-transparent text-primary hover:bg-primary hover:text-white ",

                        secondary: "bg-secondary hover:bg-white text-white hover:text-secondary hover:border hover:border-secondary",
                        secondary_outlined: "border border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-white ",

                        warning:
                              "bg-warning hover:bg-white text-white hover:text-warning hover:border hover:border-warning",
                        warning_outlined: "border border-warning bg-transparent text-warning hover:bg-warning hover:text-white ",
                        danger:
                              "bg-error hover:bg-white text-white hover:text-error hover:border hover:border-error",
                        danger_outlined: "border border-error bg-transparent text-error hover:bg-error hover:text-white ",

                        inverse:
                              "bg-gray-600 hover:bg-white text-white hover:text-gray-600 hover:border hover:border-gray-600",
                        inverse_outlined: "border border-gray-600 bg-transparent text-gray-600 hover:bg-gray-600 hover:text-white ",

                        success:
                              "bg-success hover:bg-white text-white hover:text-success hover:border hover:border-success",
                        success_outlined: "border border-success bg-transparent text-success hover:bg-success hover:text-white ",

                        purple:
                              "bg-purple-500 hover:bg-white text-white hover:text-purple-500 hover:border hover:border-purple-500",
                        purple_outlined: "border border-purple-500 bg-transparent text-purple-500 hover:bg-purple-500 hover:text-white ",

                        default:
                              "bg-gray-500 hover:bg-white text-white hover:text-gray-500 hover:border hover:border-gray-500",
                        default_outlined: "border border-gray-500 bg-transparent text-gray-500 hover:bg-gray-500 hover:text-white ",

                  },
                  size: {
                        sm: "h-[2.5rem]",
                        md: "h-[3rem]",
                        lg: "h-[3.5rem]"
                  },
                  rounded: {
                        sm: "rounded-sm",
                        md: "rounded-md",
                        lg: "rounded-lg",
                        full: "rounded-full"
                  },

            },

            defaultVariants: {
                  variant: "primary", // will be used if we won't pass any prop for intent
                  size: "sm",
            },
      }
);



export default function Button({
      variant,
      size,
      rounded,
      className = "",
      children,
      onClick,
      isLoading,
      isDisabled,
      loader
}: ButtonProps): JSX.Element {
      console.log(loader);
      return (
            <button onClick={onClick} disabled={isDisabled} className={cn(ButtonVariants({
                  variant, size,
                  rounded,
            }), className)}>{isLoading ? loader ? loader : "درحال بارگذاری" : children} {loader}</button>
      )
}

