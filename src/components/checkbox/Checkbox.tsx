import React, { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';
import { ColorType, RoundedType, SvgColorType } from '../../types/GlobalType';

type Variant = ColorType;
type rounded = RoundedType | "custom";
type CheckboxProps = {
  id: string;
  label: string;
  value: string;
  svg?: ReactNode;
  onChange?: (checked: boolean, value: string) => void;
  checked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: ColorType;
  svgColor?: SvgColorType;
  background?: Variant;
  rounded?: rounded,
};

const checkboxStyles = cva('flex items-center gap-2 cursor-pointer ', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    color: {
      primary: 'border-primary ',
      secondary: 'border-secondary',
      warning: 'border-warning',
      danger: 'border-error',
      inverse: 'border-gray-600',
      success: 'border-success',
      purple: 'border-purple-500 ',
      default: 'border-gray-500  ',
      white: 'border-gray-300',
    },
    background: {
      primary: 'bg-primary ',
      secondary: 'bg-white ',
      warning: 'bg-warning ',
      danger: 'bg-error ',
      inverse: 'bg-gray-600 ',
      success: 'bg-success ',
      purple: 'bg-purple-500 ',
      default: 'bg-gray-300 ',
      white: 'bg-white ',
    },
    svgColor: {
      primary: 'stroke-primary',
      secondary: 'stroke-secondary',
      warning: 'stroke-warning',
      danger: 'stroke-error',
      inverse: 'stroke-gray-600',
      success: 'stroke-success',
      purple: 'stroke-purple-500',
      default: 'stroke-gray-500',
      white: 'stroke-white',
    },
    rounded: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
      custom: "rounded"
    }
  },
  defaultVariants: {
    color: "default"

  },
});

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  value,
  svgColor,
  svg,
  onChange,
  checked = false,
  size,
  color,
  background,
  rounded,
}) => {
  const handleChange = () => {
    if (onChange) {
      onChange(!checked, value);
    }
  };

  return (
    <div>
      <div
        className={cn(
          'flex justify-center items-center w-5 h-5 border-[0.104rem]  ',
          checkboxStyles({
            color: color ? background : color,
            rounded,
            background: checked ? background : undefined,
          })
        )}
        onClick={handleChange}
      >
        <input
          type="checkbox"
          id={id}
          value={value}
          checked={checked}
          className={cn('hidden')}
        />
        {checked && (
          svg || (
            
            <svg
              width="9"
              height="7"
              viewBox="0 0 9 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(checkboxStyles({ svgColor }))}
            >
              <path
                d="M2.8 4.2998L1.2 2.6998L0 3.8998L2.8 6.6998L8 1.4998L6.8 0.299805L2.8 4.2998Z"
                fill="white"
              />
            </svg>
          )
        )}
      </div>
      <label
        htmlFor={id}
        className={cn('cursor-pointer', checkboxStyles({ size }))}>
        {label}
      </label>
    </div>
  );
};
export default Checkbox;
