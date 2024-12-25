import React, { ReactNode } from 'react'

import { cva } from "class-variance-authority";
import cn from '../../utils/cnFun';
import { ColorType, FontWeightType, RoundedType, SizeType } from '../../types/GlobalType';

type variant = ColorType
type size = SizeType
type fontWeight = FontWeightType




type SectionTitleVariantsProps = {
      variant?: variant
      size?: size
      fontWeight?: FontWeightType
}


type SectionTitleProps = SectionTitleVariantsProps & {
      logoIcon?: ReactNode
      className?: string
      children?: ReactNode
}


type SectionTitleVariantsFunction = (props: SectionTitleVariantsProps) => string;

const SectionTitleVariants: SectionTitleVariantsFunction = cva(
      "after:absolute after:right-0 after:ltr:left-0 after:top-[calc(100%+0.25rem)] after:rounded-xl relative after:h-[2px] after:w-10/12 w-fit",
      {

            variants: {
                  variant: {
                        primary: "text-primary after:bg-primary",
                        secondary: "text-secondary after:bg-secondary",
                        warning: "text-warning after:bg-warning",
                        danger: "text-error after:bg-error",
                        inverse: "text-gray-600 after:bg-gray-600",
                        success: "text-success after:bg-success",
                        purple: "text-purple-500 after:bg-purple-500",
                        default: "text-gray-500 after:bg-gray-500",
                        white: "text-white after:bg-white",
                  },
                  size: {
                        sm: "text-sm",
                        md: "text-md",
                        lg: "text-lg",
                        xl: "text-xl"
                  },
                  fontWeight: {
                        light: "font-light",
                        normal: "font-normal",
                        bold: "font-bold",
                        fat: "font-fat",
                  }

            },

            defaultVariants: {
                  variant: "primary",
                  size: "lg",
                  fontWeight: "bold"
            },
      }
);



export default function SectionTitle({
      variant,
      size,
      className,
      children
}: SectionTitleProps): JSX.Element {
      return (
            <div className={cn(
                  SectionTitleVariants({ variant, size }),
                  className
            )}>
                  {children}
            </div>
      )
}

