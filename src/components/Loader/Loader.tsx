import React from 'react'
import { cva } from "class-variance-authority";
import cn from '../../utils/cnFun';
import './Loader.css'
import { SizeType } from '../../types/GlobalType';


type variant = "primary" | "secondary" | "error" | "warning" | "white"
type size = SizeType
type rounded = "sm" | "md" | "lg" | "full"
type labelcolor = "primary" | "secondary" | "error" | "warning" | "white"



type LoaderVariantsProps = {
      variant?: variant;
      size?: size
      rounded?: rounded
      labelcolor?: labelcolor
}


type LoaderProps = LoaderVariantsProps & {
      className?: string;
      label?: string;
}


type LoaderVariantsFunction = (props: LoaderVariantsProps) => string;

const LoaderVariants: LoaderVariantsFunction = cva(
      "",
      {

            variants: {
                  variant: {
                        primary: " border-primary",
                        secondary: " border-secondary",
                        error: " border-error",
                        warning: " border-warning",
                        white: " border-white",
                  },
                  size: {

                        sm: "size-[2.5rem]",
                        md: "size-[3rem]",
                        lg: "size-[4rem]"
                  },
                  labelcolor: {
                        primary: " text-primary",
                        secondary: "text-secondary",
                        error: " text-error",
                        warning: " text-warning",
                        white: " text-white",
                  }
            },

            defaultVariants: {
                  variant: "primary",
                  size: "sm",
                  labelcolor: "primary"
            },
      }
);



export default function Loader({
      variant,
      size,
      labelcolor,
      className,
      label,
}: LoaderProps): JSX.Element {

      return (
            <div className='w-fit  flex justify-center items-center gap-1 flex-col'>
                  <div className={cn(
                        cn("perspective relative  rounded-full ", LoaderVariants({
                              size
                        })
                        )
                  )}>
                        <div className={cn(
                              "absolute w-full h-full rounded-full left-0 top-0 animate-[loadingCircleOne_1.2s_linear_infinite] border-b-4",
                              LoaderVariants({
                                    variant
                              }), className
                        )}></div>
                        <div className={cn(
                              "absolute w-full h-full rounded-full right-0 top-0 animate-[loadingCircleTwo_1.2s_linear_infinite] border-r-4",
                              LoaderVariants({
                                    variant
                              }), className
                        )}></div>
                        <div className={cn(
                              "absolute w-full h-full rounded-full right-0 bottom-0 animate-[loadingCircleThree_1.2s_linear_infinite] border-t-4",
                              LoaderVariants({
                                    variant
                              }), className
                        )}></div>
                  </div>
                  {label && <p className={
                        cn("text-sm ", LoaderVariants({
                              labelcolor
                        }),
                              "w-fit"
                        )
                  }>{label}</p>}
            </div>
      )
}

