import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';
import { ColorType, RoundedType, ShadowType, SizeType } from '../../types/GlobalType';

type VariantType = ColorType;
type textColor = ColorType;
type Size = SizeType;
type rounded = RoundedType;
type shadow = ShadowType

const CardVariants = cva(
    'overflow-hidden text-[10px] rounded-lg transition-all duration-300 group-hover:scale-[1.3]',
    {
        variants: {
            variant: {
                primary: "bg-primary  text-primary",
                secondary: "bg-secondary  text-secondary",
                warning: "bg-warning  text-warning",
                danger: "bg-error  text-error",
                success: "bg-success  text-success",
                inverse: "bg-gray-600 text-gray-600",
                purple: "bg-purple-500 text-purple-500",
                default: "bg-gray-500  text-gray-500",
                white: "bg-white text-primary  ",
            },
            textcolor: {
                primary: "text-primary",
                secondary: "text-secondary",
                warning: "text-warning",
                danger: "text-error",
                success: "text-success",
                inverse: "text-gray-600",
                purple: "text-purple-500",
                default: "text-gray-500",
                white: "text-white",
            },
            size: {
                sm: 'w-[6rem] h-[5rem]',
                md: 'w-[14.25rem] h-[9.1875rem]',
                lg: 'w-[18rem] h-[12rem]'
            },
            shadow: {
                none: 'shadow-none',
                sm: 'shadow-sm',
                md: 'shadow-md',
                lg: 'shadow-lg',
                xl: 'shadow-xl',
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
            rounded: 'lg',
        },
    }
);
const ImgVariants = cva(
    'border-2 border-red-400 w-full h-full ',
    {
        variants: {
            rounded: {
                full: "rounded-full",
                md: "rounded-md",
                sm: "rounded-sm",
                lg: "rounded-lg"
            },
        },
        defaultVariants: {
            rounded: 'lg',
        },
    }
);



type CardProps = {
    imageSrc: string;
    altText: string;
    size?: Size;
    shadow?: shadow;
    rounded?: rounded;
    variant?: VariantType;
    textcolor?: textColor;
    content: string;
};

const Card: React.FC<CardProps> = ({
    imageSrc,
    altText,
    size,
    shadow,
    rounded,
    variant,
    textcolor,
    content
}) => {
    return (
        <div className={cn(CardVariants({ size, shadow, rounded, variant, textcolor }), "flex flex-col gap-3 justify-center items-center group")}>
            <div className=' px-3 py-3 text-center'>
                <img
                className={cn(ImgVariants({ rounded}), "w-full h-full object-cover group-hover:scale-[1.2]")}
                    alt={altText}
                    loading="lazy"
                    width={100}
                    height={100}
                  src={imageSrc} />
           <p>{content}</p>
            </div>
          
        </div>
    );
};

export default Card;
