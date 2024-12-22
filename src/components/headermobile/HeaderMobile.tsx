import React, { ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../utils'
import { ColorType } from '../../types/GlobalType'

type HeaderMobileVariantsProps = {
      variant?: ColorType
}

type HeaderMobileProps = HeaderMobileVariantsProps & {
      variant?: ColorType
      children: ReactNode
      className?: string,
      rightElement?: ReactNode;
      leftElement?: ReactNode
}

type HeaderMobileVariantsFunction = (props: HeaderMobileVariantsProps) => string;

const HeaderMobileVariants: HeaderMobileVariantsFunction = cva(
      "md:hidden flex justify-between items-center gap-2 h-[5rem]  w-full px-4",
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
                  }
            },
            defaultVariants: {
                  variant: "primary"
            },
      }
);

export default function HeaderMobile({
      variant = "primary",
      children,
      className,
      rightElement,
      leftElement
}: HeaderMobileProps): JSX.Element {

      return (
            <header className={cn(HeaderMobileVariants({ variant }), className)}>
                  {rightElement}
                  <p className='text-center flex-1'>{children}</p>
                  {leftElement}
            </header>
      )
}