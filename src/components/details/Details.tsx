import React, { useState } from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';
import { ColorType, SizeType, SvgColorType } from '../../types/GlobalType';

type variant = ColorType;
type size = SizeType;
type rounded = SizeType | "full";
type svgText = SvgColorType;

type DetailsVariantsProps = {
  variant?: variant;
  minheigh?: size;
  rounded?: rounded;
};

type DetailsProps = DetailsVariantsProps & {
  className?: string;
  summary: string;
  children: React.ReactNode;
  svgColor?: string;
  svgText?: svgText;
  iconSvg?: React.ReactNode;
};

type DetailsVariantsFunction = (props: DetailsVariantsProps) => string;

const DetailsVariants: DetailsVariantsFunction = cva(
  "cursor-pointer transition-all duration-300 p-5 relative w-full overflow-hidden group hover:shadow-shadow_comment flex justify-between items-start flex-col gap-2 shadow-shadow_comment",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        warning: "bg-warning text-white",
        danger: "bg-error text-white",
        success: "bg-success text-white",
        inverse: "bg-gray-600 text-white",
        purple: "bg-purple-500 text-white",
        default: "bg-gray-500 text-white",
        white: "bg-white text-gray-600 ",
      },
      // svgColor: {
      //   primary: "stroke-primary",
      //   secondary: "stroke-secondary",
      //   warning: "stroke-warning",
      //   danger: "stroke-error",
      //   inverse: "stroke-gray-600",
      //   success: "stroke-success",
      //   purple: "stroke-purple-500",
      //   default: "stroke-gray-500",
      //   white: "stroke-white"
      // },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      minheigh: {
        sm: "min-h-[90px]",
        md: "min-h-[100px]",
        lg: "min-h-[120px]",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "sm"
    },
  }
);

export default function Details({
  variant,
  rounded,
  minheigh,
  svgColor,
  className,
  summary,
  children,
  iconSvg,
}: DetailsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      className={cn(DetailsVariants({ variant, minheigh, rounded }), className)}
      open={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      style={{ height: isOpen ? "auto" : undefined }}
    >
      <summary className="font-semibold cursor-pointer flex items-center transition-all duration-300 group gap-2">
        <div className="absolute top-8 -right-[0.2rem] flex -translate-x-1/2 -translate-y-1/2">
          {iconSvg !== undefined ? iconSvg : null}
        </div>
        {summary}
        <svg
          width="20"
          height="20"
          viewBox="0 0 10 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            `transition-transform duration-300  `,
            {
              "-rotate-90": isOpen
            },

          )}
        >
          <path
            d="M8.5 15L1.5 8L8.5 1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(svgColor)}
          />
        </svg>
      </summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}
