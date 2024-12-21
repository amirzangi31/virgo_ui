import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../utils'
import { ReactNode } from 'react';

type isOpenType = boolean



type SidebarHeaderVariantsProps = {
      isOpen: isOpenType
      isRightButton?: boolean
      isLeftButton?: boolean
}


type SidebarHeaderProps = SidebarHeaderVariantsProps & {
      isOpen: isOpenType,
      children?: ReactNode,
      isRightButton?: boolean
      isLeftButton?: boolean
      rightButton?: ReactNode
      leftButton?: ReactNode
      isAvatar?: boolean,
      rightButtonClassName?: string
      leftButtonClassName?: string
      avatarClassName?: string
      avatar?: ReactNode
}


type SidebarHeaderVariantsFunction = (props: SidebarHeaderVariantsProps) => string;

const SidebarHeaderVariants: SidebarHeaderVariantsFunction = cva(
      "",
      {
            variants: {
                  isOpen: {
                        true: "transition-all duration-300 delay-300 opacity-100",
                        false: "hidden "
                  },
                  isRightButton: {
                        true: "transition-all duration-300 delay-300 opacity-100",
                        false: "hidden "
                  },
                  isLeftButton: {
                        true: "transition-all duration-300 delay-300 opacity-100",
                        false: "hidden "
                  }

            },
            defaultVariants: {
                  isOpen: false
            },
      }
);


const SidebarHeader = ({
      isOpen = false,
      children,
      isLeftButton = true,
      isRightButton = true,
      rightButton,
      leftButton,
      avatarClassName,
      isAvatar = true,
      rightButtonClassName,
      leftButtonClassName,
      avatar
}: SidebarHeaderProps) => {
      return (
            <header className='flex justify-center items-center flex-col relative gap-2 py-4'>
                  {
                        isOpen && isLeftButton && (
                              <div className={cn(
                                    'absolute top-4 left-4  transition-all duration-300 delay-300 opacity-0',
                                    SidebarHeaderVariants({ isOpen, isLeftButton }),
                                    leftButtonClassName
                              )}>
                                    {leftButton}
                              </div>
                        )
                  }
                  {
                        isAvatar && (
                              <div className={cn(
                                    'size-[3.75rem] rounded-full border border-error bg-emerald-600 overflow-hidden relative z-[1]',
                                    avatarClassName
                              )}>
                                    {avatar}
                              </div>
                        )
                  }
                  {
                        isOpen && isRightButton && (
                              <div className={cn(
                                    'absolute top-4 right-4  transition-all duration-300 delay-300 opacity-0',
                                    SidebarHeaderVariants({ isOpen, isRightButton }),
                                    rightButtonClassName
                              )}>
                                    {rightButton}
                              </div>
                        )
                  }
                  {children && isOpen ? children : ""}
            </header>
      )
}

export default SidebarHeader