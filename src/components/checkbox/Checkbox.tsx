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
  boxClassName?: string
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
      primary: 'fill-primary',
      secondary: 'fill-secondary',
      warning: 'fill-warning',
      danger: 'fill-error',
      inverse: 'fill-gray-600',
      success: 'fill-success',
      purple: 'fill-purple-500',
      default: 'fill-gray-500',
      white: 'fill-white',
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
    
  },
});

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  value,
  svgColor,
  boxClassName,
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
    <div className='flex justify-center items-center gap-2'>
      <div
        className={cn(
          'flex justify-center items-center w-5 h-5 border-[0.104rem]  ',
          checkboxStyles({
            color,
            rounded,
            background: checked ? background : undefined,
          }),
          boxClassName
        )}
        // onClick={handleChange}
      >
        <input
          type="checkbox"
          id={id}
          value={value}
          checked={checked}
          className={cn('hidden')}
          onChange={handleChange}
        />
        {checked && (
          svg || (

            <svg
              width="9"
              height="7"
              viewBox="0 0 9 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"

            >
              <path
                d="M2.8 4.2998L1.2 2.6998L0 3.8998L2.8 6.6998L8 1.4998L6.8 0.299805L2.8 4.2998Z"
                className={cn("fill-white", checkboxStyles({ svgColor }))}
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
