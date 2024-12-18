import React, { ReactNode } from 'react'

import { cva } from "class-variance-authority";
import cn from '../../utils/cnFun';

type variant = "primary" | "primary_outlined" | "secondary" | "secondary_outlined" | "warning" | "warning_outlined" | "danger" | "danger_outlined" | "inverse" | "inverse_outlined" | "success" | "success_outlined" | "purple" | "purple_outlined" | "default" | "default_outlined";
type size = "sm" | "md" | "lg"
type rounded = "sm" | "md" | "lg" | "full"




type HeaderVariantsProps = {

}


type HeaderProps = HeaderVariantsProps & {
     
}


type HeaderVariantsFunction = (props: HeaderVariantsProps) => string;

const HeaderVariants: HeaderVariantsFunction = cva(
      "flex justify-center items-center gap-2 px-4  transition-all duration-300 min-w-[180px]   cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none",
      {

            variants: {
                  variant: {


                  },
                  size: {

                  },
                  rounded: {

                  },

            },

            defaultVariants: {

            },
      }
);



export default function Header({

}: HeaderProps): JSX.Element {
      return (
            <header className='  bg-primary min-h-[5rem] mdSecondary:flex  justify-center items-center'>
                  <div className="container py-2 hidden mdSecondary:block ">
                        <div className='flex items-center w-full '>

                              {/* Logo */}
                              
                              {/* Navbar */}
                              <nav className='rtl:mr-4 ltr:ml-4 w-full ' >
                                    <ul className='flex justify-start items-center gap-3 text-white  w-full'>
                                          <li>
                                                
                                          </li>
                                        
                                          <li className='rtl:mr-auto ltr:ml-auto flex justify-start items-center gap-4'>
                                                <a href={"https://dr.arenap.ir/Dashboard"} rel='nofollow noopener noreferrer external' target='_blank' className='text-md'>
                                                      ثبت نام / ورود پزشک
                                                </a>
                                          </li>
                                    </ul>
                              </nav>

                        </div>
                  </div>
            </header>
      )
}

