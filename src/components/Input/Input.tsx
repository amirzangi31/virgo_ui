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
        default: "border border-gray  focus:border-gray-200 ",
        error: "border border-error  focus:border-error ",
        success: "border border-green-500  focus:border-green-500 ",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      isDisabled: {
        false: "",
        true: "bg-error border-none "
      }
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
  disabled?: boolean
};

type InputProps = InputVariantsProps & {
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  className?: string;
  label?: string; // اضافه کردن label به پروپ‌ها
  errorClassName?: string
  labelClassName?: string
  errorText?: string
};

export default function Input({
  size,
  variant,
  rounded,
  placeholder = "",
  value = "",
  name,
  onChange,
  onFocus,
  isDisabled = false,
  className = "",
  label,
  errorClassName,
  labelClassName,
  errorText
}: InputProps): JSX.Element {
  return (
    <div className="flex flex-col relative">
      {label && (
        <label htmlFor={name} className={cn(
          "my-2 text-sm font-bold text-black px-2 text-right ltr:text-left ",
          labelClassName
        )}>
          {label}
        </label>
      )}
      <input
        id={name}
        type="tel"
        name={name}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isDisabled}
        className={cn(InputVariants({ size, variant, rounded, isDisabled }), className)}
      />
      <p className={cn(
        "text-error absolute top-full right-0 ltr:left-0  text-sm px-4",
        errorClassName
      )}>{errorText}</p>
    </div>
  );
}
