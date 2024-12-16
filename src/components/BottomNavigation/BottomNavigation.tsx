import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';
const LinkNavigationVariants = cva(
    "flex justify-center items-center gap-1 flex-col-reverse text-sm transition-all duration-300",
    {
      variants: {
        active: {
          true: "text-primary font-bold",
          false: "text-black font-normal",
        },
        bgColor: {
          default: "bg-gray-200 h-100",
          active: "bg-gray-200",
        },
      },
      defaultVariants: {
        active: true,
        bgColor: 'default',
      },
    }
  );
  
  type LinkProps = {
    active: boolean;
    bgColor?: 'default' | 'active';
    children: React.ReactNode;
  };
  
  const LinkElement: React.FC<LinkProps> = ({ active, bgColor = 'default', children }) => {
    return (
      <div className={cn(LinkNavigationVariants({ active, bgColor }))}>
        {children}
      </div>
    );
  };
  
  export default LinkElement;