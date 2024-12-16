import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';

const InputVariants = cva(
  "placeholder:text-gray placeholder:px-3 w-full rounded-full text-right transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "text-sm px-2 py-1",
        md: "text-base px-3 py-2",
        lg: "text-lg px-4 py-3",
      },
      variant: {
        default: "border border-gray focus:ring focus:ring-gray-200",
        error: "border border-red-500 focus:ring focus:ring-red-200",
        success: "border border-green-500 focus:ring focus:ring-green-200",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "default",
    },
  }
);

type InputVariantsProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
};

type InputProps = InputVariantsProps & {
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  className?: string;
  label?: string; // اضافه کردن label به پروپ‌ها
};

export default function Input({
  size,
  variant,
  rounded,
  placeholder = "",
  value = "",
  name,
  onChange,
  isDisabled = false,
  className = "",
  label,
}: InputProps): JSX.Element {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="my-2 text-sm font-bold text-black px-2">
          {label}
        </label>
      )}
      <input
        id={name} 
        type="tel"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isDisabled}
        className={cn(InputVariants({ size, variant, rounded }), className)}
      />
    </div>
  );
}
