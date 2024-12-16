import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';


const InputGridVariants = cva(
  "border border-gray-300 rounded-full text-center focus:outline-none transition-all duration-300",
  {
    variants: {
      size: {
        sm: "text-sm w-12",
        md: "text-base w-16",
        lg: "text-lg w-20",
        xl: "text-xl w-[3.75rem]", 
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      variant: {
        default: "border-gray-300 focus:ring-gray-200",
        error: "border-red-500 focus:ring-red-200",
        success: "border-green-500 focus:ring-green-200",
      },
    },
    defaultVariants: {
      size: "xl", 
      variant: "default",
    },
  }
);

type InputGridProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'error' | 'success';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
};


const InputGrid: React.FC<InputGridProps> = ({
  size = 'xl',
  variant = 'default',
  rounded = 'lg',
  className,
  onChange,
  value,
  name,
}) => {
  return (
    <input
      className={cn(InputGridVariants({ size, variant, rounded }), className)}
      onChange={onChange}
      value={value}
      name={name}
    />
  );
};

export default InputGrid;
