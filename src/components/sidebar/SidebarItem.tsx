import React, { ReactNode } from 'react'
import { cva } from 'class-variance-authority';
import { cn } from '../../utils';







type SidebarItemVariantsProps = {
}


type SidebarItemProps = SidebarItemVariantsProps & {
      className?: string
      icon?: ReactNode
      text?: string
      textClassName?: string
      iconClassName?: string
      isOpen: boolean
}


type SidebarItemVariantsFunction = (props: SidebarItemVariantsProps) => string;

const SidebarItemVariants: SidebarItemVariantsFunction = cva(
      "flex  items-center gap-2 relative  py-2 after:absolute after:bottom-0  after:right-1/2 after:w-0 after:h-[2px] after:bg-primary after:block hover:after:w-full hover:after:right-0 after:rounded-xl after:transition-all after:duration-500 cursor-pointer hover:text-primary transition-color duration-300 w-full",
      {
            variants: {
                  isOpen: {
                        true: "justify-between",
                        false: "justify-center"
                  }
            },
            defaultVariants: {

            },
      }
);




const SidebarItem = ({
      className,
      icon,
      text,
      textClassName,
      iconClassName,
      isOpen
}: SidebarItemProps) => {
      return (
            <div
                  title={!isOpen ? text : ""}
                  className={cn(

                        SidebarItemVariants({ isOpen }),
                        className
                  )}>
                  <span className={cn(
                        " flex justify-center items-center",
                        iconClassName
                  )}>{icon}</span>

                  <p className={cn(textClassName, {
                        "hidden": !isOpen
                  })}>{text}</p>

                  {isOpen && <span></span>}
            </div>
      )
}

export default SidebarItem