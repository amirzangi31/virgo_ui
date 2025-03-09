import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun'; 
import { ColorType, RoundedType, ShadowType, SizeType } from '../../types/GlobalType';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

const TextareaVariants = cva(
  'border p-2 focus:outline-none transition-all duration-300', // استایل‌های پیش‌فرض
  {
    variants: {
      size: {
        sm: 'text-sm p-2',
        md: 'text-md p-3',
        lg: 'text-lg p-4',
      },
      rounded: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
      color: {
        primary:
          " bg-white  text-primary border border-primary",
        secondary: "bg-secondary bg-white  text-secondary border border-secondary",
        warning:
          " bg-white  text-warning border border-warning",
        danger:
          " bg-white  text-error border border-error",
        inverse:
          " bg-white  text-gray-600 border border-gray-600",
        success:
          "bg-white  text-success border border-success",
        purple:
          " bg-white  text-purple-500 border border-purple-500",
        default:
          " bg-white  text-gray-500 border border-gray-500",
        white:
          "bg-white text-gray-500 text-gray-500 border border-gray-500",
      },
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm ',
        md: 'shadow-md ',
        lg: 'shadow-lg ',
        xl: 'shadow-xl ',
    },
      minWidth: {
        sm: "min-w-[9.25rem]",
        md: "min-w-[140px]",
        lg: "min-w-[48.25rem]",
        full: "min-w-full",
    },
    isDisabled: {
      false: "",
      true: "bg-error border-none ",
    },
    },
    defaultVariants: {
      size: 'md',
      rounded: 'md',
      color: 'default',
      shadow: 'sm',
    },
  }
);

// کامپوننت Textarea
type TextareaProps = {
  size?: SizeType;
  isDisabled?: boolean;
  errorClassName?: string;
  className?: string;
  rounded?: RoundedType;
  color?: ColorType;
  shadow?: ShadowType;
  label?: string;
  placeholder?: string;
  id: string;
  rows?: number;
  cols?: number;
  minWidth?: SizeType;
  register?: UseFormRegisterReturn; 
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: FieldError | undefined; 
};

const Textarea: React.FC<TextareaProps> = ({
  size,
  rounded,
  color,
  shadow,
  className = '',
  isDisabled = false,
  errorClassName,
  label,
  onChange,
  onFocus,
  error,
  placeholder,
  register,
  id,
  rows = 4,
  cols = 50,
}) => {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium mb-2">{label}</label>}
      <textarea
  
        id={id}
        name={id}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        disabled={isDisabled}
        onFocus={onFocus}
        onChange={onChange}
        className={cn(TextareaVariants({ size, rounded, color, shadow, isDisabled }), className, "py-2")}
        {...register}
      />
      {error && (
        <p
          className={cn(
            'text-error absolute top-full right-0 ltr:left-0 text-sm px-4',
            errorClassName
          )}
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Textarea;
