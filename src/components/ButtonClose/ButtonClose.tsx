import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';

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
      },
      color: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        danger: "bg-red-500",
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
  color?: 'primary' | 'secondary' | 'danger';
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
      className={cn(IconButtonVariants({ size, rounded, color }), className)}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 15.1387L14.5516 1.58704"
          className="stroke-white"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
        <path
          d="M1.0752 1L14.846 14.7708"
          className="stroke-white"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
      </svg>
      {children}
    </div>
  );
}
