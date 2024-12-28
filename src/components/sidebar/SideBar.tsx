import React, { ReactNode } from 'react'
import { cva } from 'class-variance-authority';
import SidebarHeader from './SidebarHeader';
import './index.css'
import { cn } from '../../utils';

type isOpenType = boolean



type SidebarVariantsProps = {
      isOpen: isOpenType
}


type SidebarProps = SidebarVariantsProps & {
      isOpen: isOpenType
      children: ReactNode
      className?: string
      onClose: () => void,
      closeButton?: ReactNode
}


type SidebarVariantsFunction = (props: SidebarVariantsProps) => string;

const SidebarVariants: SidebarVariantsFunction = cva(
      "fixed top-0 z-10  rounded-l-xl w-8/12  md:relative  bg-white md:rounded-xl shadow-shadow_category h-full px-4 overflow-auto  transition-all duration-300",
      {
            variants: {
                  isOpen: {
                        true: "right-0 ltr:left-0  md:w-[18.75rem]",
                        false: "-right-full ltr:-left-full md:w-[6.25rem] md:right-0 md:ltr:left-0"
                  }

            },
            defaultVariants: {
                  isOpen: false
            },
      }
);

const SideBar = ({
      isOpen = false,
      children,
      className,
      onClose,
      closeButton
}: SidebarProps) => {

      return (
            <>
                  {
                        isOpen &&
                        <span onClick={onClose} className='md:hidden fixed left-0 top-0 backdrop-blur-md backdrop-brightness-50  w-full h-screen z-10'></span>
                  }
                  <aside className={
                        cn(
                              SidebarVariants({ isOpen }),
                              className
                        )
                  }>

                        {
                              closeButton ? closeButton : (
                                    <button onClick={onClose} type='button' className='hidden md:flex bg-primary  justify-center items-center  absolute bottom-[7%] -left-0 size-[2rem] rounded-r-full ' >
                                          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn(
                                                "stroke-white transition-all duration-300 ",
                                                {
                                                      "rotate-0": !isOpen,
                                                      "rotate-180": isOpen
                                                }
                                          )}>
                                                <path d="M8.5 15L1.5 8L8.5 1" className='stroke-white' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                          </svg>
                                    </button>
                              )
                        }
                        {
                              closeButton ? closeButton : (
                                    <button onClick={onClose} type='button' className='flex md:hidden bg-primary  justify-center items-center  absolute bottom-[7%] -left-0 h-[2rem] px-4 rounded-r-full text-white' >
                                          بستن
                                    </button>
                              )
                        }
                        {children}
                  </aside>
            </>
      )
}

export default SideBar

