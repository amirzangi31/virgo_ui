import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';

const IconButtonBack = cva(
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
      },
      color: {
        primary: "bg-white",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "full",
      color: "primary",
    },
  }
);

type IconButtonVariantsProps = {
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'full';
  color?: 'primary' ;
};

type IconButtonProps = IconButtonVariantsProps & {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

export default function IconButton({
  size,
  rounded,
  color,
  onClick,
  children,
  className = "",
}: IconButtonProps): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={cn(IconButtonBack({ size, rounded, color }), className)}
    >
     <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1L8.5 8L1.5 15" stroke="#006A67" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      {children}
    </div>
  );
}
