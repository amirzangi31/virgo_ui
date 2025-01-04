import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';
import { ColorType, RoundedType, SizeType } from '../../types/GlobalType';
type rounded = RoundedType;
type VariantType = ColorType;
type MinWidth = SizeType | "full"
const LabelBack = cva(
    'flex group justify-center items-center gap-3 p-3 relative transition-all duration-300 overflow-hidden',
    {
        variants: {
            active: {
                true: '',
                false: '',
            },
            variant: {
                primary: "bg-white",
                secondary: "bg-white",
                warning: "bg-white",
                danger: "bg-white",
                success: "bg-white",
                inverse: "bg-white",
                purple: "bg-white",
                default: "bg-white",
                white: "bg-white",
            },
       
            rounded: {
                full: "rounded-[2.1rem]",
                md: "rounded-[1.85rem]",
                sm: "rounded-[1.75rem]",
                lg: "rounded-[1.95rem]"
            },
            minheight: {
                sm: "h-[2.9375rem]",
                md: "h-[3.1375rem]",
                lg: "h-[3.2375rem]",
                full: "h-[3.3375rem]"
            },
            minwith: {
                sm: " w-[5.625rem]",
                md: " w-[5.725rem]",
                lg: " w-[5.85rem]",
                full: " w-[5.925rem]"
            }
        },
        compoundVariants: [
            {  variant: "primary", className: "after:absolute after:transition-all after:duration-300 after:left-0 after:bottom-full after:block after:bg-primary after:w-full after:h-full after:-z-1 hover:after:bottom-0" },
            {  variant: "secondary", className: " after:absolute after:transition-all after:duration-300 after:left-0 after:bottom-full after:block after:bg-secondary after:w-full after:h-full after:-z-1 hover:after:bottom-0" },
            {  variant: "warning", className: " after:absolute after:transition-all after:duration-300 after:left-0 after:bottom-full after:block after:bg-warning after:w-full after:h-full after:-z-1 hover:after:bottom-0" },
            {  variant: "danger", className:" after:absolute after:transition-all after:duration-300 after:left-0 after:bottom-full after:block after:bg-error after:w-full after:h-full after:-z-1 hover:after:bottom-0"},
            {  variant: "success", className: " after:absolute after:transition-all after:duration-300 after:left-0 after:bottom-full after:block after:bg-success after:w-full after:h-full after:-z-1 hover:after:bottom-0" },
            {  variant: "inverse", className: " after:absolute after:transition-all after:duration-300 after:left-0 after:bottom-full after:block after:bg-gray-600 after:w-full after:h-full after:-z-1 hover:after:bottom-0" },
            {  variant: "purple", className: " after:absolute after:transition-all after:duration-300 after:left-0 after:bottom-full after:block after:bg-purple-500 after:w-full after:h-full after:-z-1 hover:after:bottom-0" },
            {  variant: "default", className: " after:absolute after:transition-all after:duration-300 after:left-0 after:bottom-full after:block after:bg-gray-500 after:w-full after:h-full after:-z-1 hover:after:bottom-0" },
            {  variant: "white", className: " after:absolute after:transition-all after:duration-300 after:left-0 after:bottom-full after:block after:bg-primary/10 after:w-full after:h-full after:-z-1 hover:after:bottom-0" },
        ],
        defaultVariants: {
            active: false,
        },
    }
);




type LabelProps = {
    active: boolean;
    variant?: VariantType;
    minheight?: MinWidth;
    minwith?: MinWidth;
    name: string;
    calendarId: string;
    index: number;
    remainingTime: number;
    rounded?: rounded;
    children?: React.ReactNode;
};

export default function Label({
    active,
    calendarId,
    index,
    variant,
    rounded,
    remainingTime,
    minheight,
    minwith,
    children,
}: LabelProps): JSX.Element {
    return (
        <label
            className={cn('', {
                'cursor-pointer': remainingTime === 0,
            })}
            htmlFor={`${calendarId}-${index}`}
        >
            <div className={LabelBack({ active, rounded, variant,minheight,minwith })}>
                <p className="z-10">
                    <span
                        className={cn('md:hidden text-sm text-error', {
                            'md:group-hover:block ': !active,
                        })}
                    >
                        {!active}
                    </span>
                </p>
                {children && <div className=" z-10  flex justify-center px-3 py-3">{children}</div>}
            </div>
        </label>
    );
}

