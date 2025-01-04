import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';
import { ColorType, RoundedType, ShadowType, SizeType } from '../../types/GlobalType';

type VariantType = ColorType;
type textColor = ColorType;
type Size = SizeType;
type rounded = RoundedType;
type shadowhover = ColorType;
type shadow = ShadowType

const CardVariants = cva(
    'overflow-hidden flex flex-col transition-all duration-300 p-4',
    {
        variants: {
            variant: {
                primary: "bg-primary",
                secondary: "bg-secondary",
                warning: "bg-warning",
                danger: "bg-error",
                success: "bg-success",
                inverse: "bg-gray-600",
                purple: "bg-purple-500",
                default: "bg-gray-500",
                white: "bg-white",
            },
            textcolor: {
                primary: "text-white",
                secondary: "text-white",
                warning: "text-white",
                danger: "text-white",
                success: "text-white",
                inverse: "text-white",
                purple: "text-white",
                default: "text-white",
                white: "text-gray-500",
            },
            shadowhover: {
                primary: "hover:border-primary hover:shadow-hover",
                secondary: "hover:border-secondary hover:shadow-hover",
                warning: "hover:border-warning hover:shadow-hover",
                danger: "hover:border-error hover:shadow-hover",
                success: "hover:border-success hover:shadow-hover",
                inverse: "hover:border-gray-600 hover:shadow-hover",
                purple: "hover:border-purple-500 hover:shadow-hover",
                default: "hover:border-gray-500 hover:shadow-hover",
                white: "hover:border-gray-500 hover:shadow-hover",
            },
            size: {
                sm: 'text-sm',
                md: 'text-md',
                lg: 'text-lg'
            },
            shadow: {
                none: 'shadow-none',
                sm: 'shadow-sm ',
                md: 'shadow-md ',
                lg: 'shadow-lg ',
                xl: 'shadow-xl ',
            },
            rounded: {
                full: "rounded-full",
                md: "rounded-md",
                sm: "rounded-sm",
                lg: "rounded-lg"
            },
        },
        defaultVariants: {
            size: 'md',
            shadow: 'md',
            rounded: 'sm',
        },
    }
);

type CardProps = {
    size?: Size;
    shadowhover?: shadowhover;
    shadow?: shadow;
    rounded?: rounded;
    variant?: VariantType;
    textcolor?: textColor;
    children?: React.ReactNode;
    iconSvg?: React.ReactNode; 
};

const Card: React.FC<CardProps> = ({
    size,
    shadowhover,
    rounded,
    variant,
    textcolor,
    shadow,
    children,
    iconSvg
}) => {
    return (
        <div className={cn(CardVariants({ size, shadowhover, shadow, rounded, variant, textcolor }), "relative flex group")}>
        <div className="absolute top-8 -right-[0.2rem] flex -translate-x-1/2 -translate-y-1/2">
          {iconSvg !== undefined ? iconSvg : null}
        </div>
        <div className="flex justify-start">
          {children}
        </div>
      </div>
      
      
    );
};

export default Card;
