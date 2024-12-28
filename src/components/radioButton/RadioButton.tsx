import React, { ReactNode } from 'react'

import { cva } from "class-variance-authority";
import cn from '../../utils/cnFun';
import { ColorType, RoundedType, SizeType } from '../../types/GlobalType';

type variant = ColorType
type size = SizeType
type rounded = RoundedType
type RadioButtonVariantsProps = {
      variant?: variant;
      background?: variant
      size?: size
      rounded?: rounded,
}


type RadioButtonProps = RadioButtonVariantsProps & {
      name: string
      className?: string;
      containerClassName?: string;
      onClick?: () => void,
      isChecked?: boolean,
      title?: string
      boltClassName?: string
      id?: string
      titleClassName?: string
      value: string | number
      changeHandler: (value: string | number, e: React.ChangeEvent<HTMLInputElement>) => void
}


type RadioButtonVariantsFunction = (props: RadioButtonVariantsProps) => string;


const RadioButtonVariants: RadioButtonVariantsFunction = cva(
      "",
      {

            variants: {
                  variant: {
                        primary: "bg-primary",
                        secondary: "bg-secondary",
                        warning: "bg-warning",
                        danger: "bg-error",
                        inverse: "bg-gray-600",
                        success: "bg-success",
                        purple: "bg-purple-500",
                        default: "bg-gray-500",
                        white: "bg-white",
                  },
                  background: {
                        primary: "bg-primary",
                        secondary: "bg-secondary",
                        warning: "bg-warning",
                        danger: "bg-error",
                        inverse: "bg-gray-600",
                        success: "bg-success",
                        purple: "bg-purple-500",
                        default: "bg-gray-300",
                        white: "bg-white",
                  },
                  size: {
                        sm: "w-5 h-5",
                        md: "w-6 h-6",
                        lg: "w-8 h-8"
                  },
                  rounded: {
                        sm: "rounded-sm",
                        md: "rounded-md",
                        lg: "rounded-lg",
                        full: "rounded-full"
                  }
            },

            defaultVariants: {
                  rounded: "full"

            },
      }
);


export default function RadioButton({
      className,
      size,
      rounded,
      containerClassName,
      isChecked,
      background,
      variant,
      name,
      title,
      boltClassName,
      id,
      titleClassName,
      value,
      changeHandler
}: RadioButtonProps): JSX.Element {
      return (
            <label htmlFor={id} className={cn(
                  "flex justify-start items-center gap-2 cursor-pointer",
                  containerClassName
            )}>
                  <div className={cn("flex justify-center items-center gap-2 p-1", RadioButtonVariants({ size, rounded, background }), className)}>
                        <input
                              id={id}
                              type="radio"
                              value={value}
                              onChange={(event) => changeHandler(value, event)}
                              checked={isChecked}
                              name={name}
                              hidden
                        />
                        {isChecked && (
                              <span className={cn("flex w-full h-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]", RadioButtonVariants({ rounded, variant }), boltClassName)}></span>
                        )}
                  </div>
                  {title && <p className={cn(titleClassName)}>{title}</p>}
            </label>
      )
}

