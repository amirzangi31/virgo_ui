import React, { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';
import { ColorType, RoundedType, SizeType, SvgColorType } from '../../types/GlobalType';

const IconButtonVariants = cva(
  "flex justify-center items-center cursor-pointer transition-all duration-300",
  {
    variants: {
      size: {
        sm: "w-[2rem] h-[2rem]",
        md: "w-[2.5rem] h-[2.5rem]",
        lg: "w-[3rem] h-[3rem]",
      },
      rounded: {
        full: "rounded-full",
        md: "rounded-md",
        sm: "rounded-sm",
        lg: "rounded-lg"
      },
      color: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        warning: "bg-warning",
        danger: "bg-error",
        inverse: "bg-gray-600",
        success: "bg-success",
        purple: "bg-purple-500",
        default: "bg-gray-500",
        white: "bg-white"
      },
      svgColor: {
        primary: "stroke-primary",
        secondary: "stroke-secondary",
        warning: "stroke-warning",
        danger: "stroke-error",
        inverse: "stroke-gray-600",
        success: "stroke-success",
        purple: "stroke-purple-500",
        default: "stroke-gray-500",
        white: "stroke-white"
      }
    },
    defaultVariants: {
      size: "md",
      rounded: "full",
      color: "primary",
      svgColor: "white"
    },
  }
);

type IconButtonVariantsProps = {
  size?: SizeType
  rounded?: RoundedType
  color?: ColorType
  svgColor?: SvgColorType
};

type IconButtonProps = IconButtonVariantsProps & {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  svgColor?: SvgColorType
  svg?: ReactNode
};

export default function IconButton({
  size,
  rounded,
  color,
  onClick,
  children,
  className = "",
  svgColor,
  svg
}: IconButtonProps): JSX.Element {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(IconButtonVariants({ size, rounded, color }), className)}
    >
      {
        svg ? svg : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 15.1387L14.5516 1.58704"
              className={cn(
                "stroke-white",
                IconButtonVariants({ svgColor })
              )}
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
            <path
              d="M1.0752 1L14.846 14.7708"
              className={cn(
                "stroke-white",
                IconButtonVariants({ svgColor })
              )}
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
          </svg>
        )
      }
      {children}
    </button>
  );
}
