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
      onClose: () => void
}


type SidebarVariantsFunction = (props: SidebarVariantsProps) => string;

const SidebarVariants: SidebarVariantsFunction = cva(
      "fixed top-0 right-0 rounded-none w-8/12  md:relative  bg-white md:rounded-xl shadow-shadow_category h-full px-4 overflow-auto  transition-all duration-300",
      {
            variants: {
                  isOpen: {
                        true: "md:w-[300px]",
                        false: "md:w-[100px]"
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
      onClose
}: SidebarProps) => {

      return (
            <aside className={
                  cn(
                        SidebarVariants({ isOpen }),
                        className
                  )
            }>
                  <button onClick={onClose} type='button' className='hidden md:flex bg-primary  justify-center items-center  absolute bottom-[7%] -left-0 size-[2rem] rounded-r-full' >
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
                  {children}
            </aside>
      )
}

export default SideBar

