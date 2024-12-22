import React, { ReactNode } from 'react'

import { cva } from "class-variance-authority";
import cn from '../../utils/cnFun';
import { ColorType, RoundedType, SizeType } from '../../types/GlobalType';

type variant = ColorType
type size = SizeType




type HeaderVariantsProps = {
      variant?: variant
      size?: size
}


type HeaderProps = HeaderVariantsProps & {
      logoIcon?: ReactNode
      className?: string
      children?: ReactNode
}


type HeaderVariantsFunction = (props: HeaderVariantsProps) => string;

const HeaderVariants: HeaderVariantsFunction = cva(
      " mdSecondary:flex  justify-center items-center w-full hidden",
      {

            variants: {
                  variant: {
                        primary: "bg-primary text-white ",
                        secondary: "bg-secondary text-white ",
                        warning: "bg-warning text-white ",
                        danger: "bg-error text-white ",
                        inverse: "bg-gray-600 text-white ",
                        success: "bg-success text-white ",
                        purple: "bg-purple-500 text-white",
                        default: "bg-gray-500 text-white",
                        white: "bg-white text-primary ",
                  },
                  size: {
                        sm: "h-[5rem]",
                        md: "h-[6rem]",
                        lg: "h-[7rem]",
                  },


            },

            defaultVariants: {
                  variant: "primary",
                  size: "sm"
            },
      }
);



export default function Header({
      logoIcon,
      variant,
      size,
      className,
      children
}: HeaderProps): JSX.Element {
      return (
            <header className={cn(
                  HeaderVariants({ variant, size }),
                  className
            )}>
                  <div className="container py-2 hidden mdSecondary:block ">
                        <div className='flex items-center w-full '>

                              {/* Logo */}
                              <div className='size-10   rounded-full '>
                                    {logoIcon}
                              </div>
                              {/* Navbar */}
                              <nav className='rtl:mr-4 ltr:ml-4 w-full ' >
                                    <ul className='flex justify-start items-center gap-3 text-white  w-full'>
                                          {children}
                                    </ul>
                              </nav>

                        </div>
                  </div>
            </header>
      )
}

