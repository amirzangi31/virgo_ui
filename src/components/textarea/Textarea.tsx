import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun'; // فرض بر این است که این تابع برای ترکیب کلاس‌ها استفاده می‌شود
import { ColorType, RoundedType, SizeType } from '../../types/GlobalType';

// تعریف کلاس‌های استایل‌دهی برای Textarea
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
        primary: 'border-primary focus:border-primary text-primary',
        secondary: 'border-secondary focus:border-secondary text-secondary',
        default: 'border-gray-300 focus:border-gray-500 text-gray-700',
      },
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
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
  rounded?: RoundedType;
  color?: ColorType;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  label?: string;
  placeholder?: string;
  id: string;
  rows?: number;
  cols?: number;
};

const Textarea: React.FC<TextareaProps> = ({
  size,
  rounded,
  color,
  shadow,
  label,
  placeholder,
  id,
  rows = 4,
  cols = 50,
}) => {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium">{label}</label>}
      <textarea
        id={id}
        name={id}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        className={cn(TextareaVariants({ size, rounded, color, shadow }))}
      />
    </div>
  );
};

export default Textarea;
