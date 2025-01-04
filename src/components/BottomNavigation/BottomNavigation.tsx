import React from 'react';

import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';
import { ColorType, SizeType } from '../../types/GlobalType';

type VariantType = ColorType;
type Minheight = SizeType | "full"

const LinkNavigationVariants = cva(
  "flex justify-center items-center text-sm transition-all duration-300 bottom-0 left-0 w-full",
  {
    variants: {
      active: {
        true: "",
        false: "",
      },
      variant: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        warning: "bg-warning",
        danger: "bg-error",
        success: "bg-success  ",
        inverse: "bg-gray-600 ",
        purple: "bg-purple-500 ",
        default: "bg-gray-500  ",
        white: "bg-white",
      },
      textColor: {
        primary: "text-primary",
        secondary: "text-secondary",
        warning: "text-warning",
        danger: "text-error",
        success: "text-success  ",
        inverse: "text-gray-600 ",
        purple: "text-purple-500 ",
        default: "text-gray-500  ",
        white: "text-white",
      },
      svgColor: {
        primary: "stroke-primary",
        secondary: "stroke-secondary",
        warning: "stroke-warning",
        danger: "stroke-error",
        inverse: "stroke-gray-600",
        success: "stroke-success",
        purple: "stroke-purple-500",
        default: "stroke-gray-500",
        white: "stroke-white"
      },

      minheight: {
        sm: "h-[4.875rem]",
        md: "h-[4.975rem]",
        lg: "h-[5.175rem]",
        full: "h-[2.275rem]"
      },
      layout: {
        row: "flex-row",
        column: "flex-col",
      },
    },

    defaultVariants: {
      active: true,
      variant: 'default',
      layout: 'row',
    },
  }
);

type LinkProps = {
  active: boolean;
  variant?: VariantType;
  minheight?: Minheight;
  children?: React.ReactNode;
  route?: string;
  onClick?: () => void;
};

export default function UserProfile({ children, variant, minheight }: LinkProps & { pathName: string }): JSX.Element {
  return (
    <div className={cn(`relative w-full `)}>
      <div className={cn(LinkNavigationVariants({variant}), "flex justify-stretch items-center p-2")}>
        <div className={cn(LinkNavigationVariants({ active: true, variant, minheight }), "text-black gap-7 flex justify-center items-center text-center")}>
          {children}
        </div>
      </div>
    </div>


  );
};

