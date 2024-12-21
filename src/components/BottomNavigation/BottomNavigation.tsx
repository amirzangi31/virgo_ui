import React from 'react'; // اضافه کردن useState
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';


const LinkNavigationVariants = cva(
  "flex justify-center items-center gap-4 text-sm transition-all duration-300 p-3 px-8 bottom-0 left-0 w-full h-[4.875rem]", 
  {
    variants: {
      active: {
        true: "text-primary font-bold",  // رنگ متن برای حالت فعال
        false: "text-black font-normal",  // رنگ متن برای حالت غیرفعال
      },
      bgColor: {
        default: "bg-gray-200 h-100",
        active: "bg-gray-200",
      },
      layout: {
        row: "flex-row",  // آیکون و نام در کنار هم
        column: "flex-col",  // آیکون و نام به صورت عمودی
      },
    },
    defaultVariants: {
      active: true,
      bgColor: 'default',
      layout: 'row',  
    },
  }
);

type LinkProps = {
  active: boolean;
  bgColor?: 'default' | 'active';
  children?: React.ReactNode;
  route?: string;
  icons?: Array<{
    icon: React.ReactNode;
    name: string;
    active: boolean;
    bgColor?: 'default' | 'active';
    layout?: 'row' | 'column';  
  }>;
  onClick?: () => void;  
};

const LinkElement: React.FC<LinkProps> = ({ active, bgColor = 'default', children, route, icons, onClick }) => {
  const customClass = route ? 'custom-route-class' : '';
  return (
    <div className={cn(LinkNavigationVariants({ active, bgColor }), customClass)} onClick={onClick}>
      {icons && icons.map((iconData, index) => (
        <div key={index} className={cn("flex items-center gap-2", LinkNavigationVariants({ 
          active: iconData.active, 
          bgColor: iconData.bgColor,
          layout: iconData.layout || 'row',  
        }))}>
          <div className="icon">{iconData.icon}</div>
          <span className="name">{iconData.name}</span>
        </div>
      ))}
      {children}
    </div>
  );
};

export default LinkElement; 