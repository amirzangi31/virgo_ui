import React, { useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';
import { ColorType, SizeType, SvgColorType } from '../../types/GlobalType';

type variant = ColorType;
type size = SizeType;
type rounded = SizeType | "full";
type svgColor = SvgColorType;
type Textcolor = SvgColorType;
type svgText = SvgColorType;

type DetailsVariantsProps = {
  variant?: variant;
  minheigh?: size;
  rounded?: rounded;
  textcolor?: Textcolor;
};

type DetailsProps = DetailsVariantsProps & {
  className?: string;
  textSvg?: string;
  summary: string;
  children: React.ReactNode;
  svgColor?: svgColor;
  svgText?: svgText;
  textcolor?: Textcolor;
  iconSvg?: React.ReactNode;
};

type DetailsVariantsFunction = (props: DetailsVariantsProps) => string;

const DetailsVariants: DetailsVariantsFunction = cva(
  "p-5 relative w-full group flex justify-between items-start flex-col gap-2 ",
  {
    variants: {
      variant: {
        primary: "bg-primary ",
        secondary: "bg-secondary ",
        warning: "bg-warning ",
        danger: "bg-error ",
        success: "bg-success ",
        inverse: "bg-gray-600 ",
        purple: "bg-purple-500 ",
        default: "bg-gray-500 ",
        white: "bg-white ",
      },
      textcolor: {
        primary: "text-primary ",
        secondary: "text-secondary ",
        warning: "text-warning ",
        danger: "text-error ",
        success: "text-success ",
        inverse: "text-gray-600 ",
        purple: "text-purple-500 ",
        default: "text-gray-500 ",
        white: "text-gray-600 ",
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
      },
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

export default function DetailsDownWard({
  variant,
  rounded,
  minheigh,
  svgColor,
  className,
  summary,
  children,
  iconSvg,
  textcolor,
  textSvg

}: DetailsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setContentHeight(textRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        DetailsVariants({ variant, minheigh, rounded, textcolor }),
        "overflow-hidden transition-all duration-500",
        className
      )}
    >
      <div
        className="font-semibold cursor-pointer flex items-center group gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute top-8 -right-[0.2rem] flex -translate-x-1/2 -translate-y-1/2">
          {iconSvg !== undefined ? iconSvg : null}
        </div>
        {summary}
      </div>
      <div
        ref={textRef}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : '0',
          overflow: 'hidden',
        }}
        className="mt-2 transition-all duration-500 ease-in-out"
      >
        {children}
      </div>
      <div
        className={cn(
          'flex justify-center items-center gap-2 font-bold w-full py-2',
          {
            "absolute bottom-0 left-0 after:absolute after:left-0 after:bottom-full after:w-full after:h-10 after:bg-white_to_up_transparent": !isOpen
          }
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 10 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200 stroke-${svgColor} ${isOpen ? "rotate-90" : "-rotate-90"}`}
        >
          <path
            d="M8.5 15L1.5 8L8.5 1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex items-center">
          {textSvg !== undefined ? textSvg : null}
        </div>
      </div>
    </div>
  );
}
