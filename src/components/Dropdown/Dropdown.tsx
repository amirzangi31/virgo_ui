import React, { useState } from "react";
import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";
import { RoundedType } from "../../types/GlobalType";

// تعریف cva برای dropdown
const dropdownVariants = cva("relative inline-block", {
  variants: {
    open: {
      true: "dropdown-open",
      false: "",
    },
  },
  defaultVariants: {
    open: false,
  },
});

// تعریف cva برای محتوای منوی dropdown
const dropdownContentVariants = cva(
  "absolute hidden bg-white text-black shadow-lg min-w-[160px] p-4 z-10",
  {
    variants: {
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      open: {
        true: "block",
        false: "hidden",
      },
    },
    defaultVariants: {
      open: false,
      rounded: "lg",
    },
  }
);

// تعریف cva برای آیتم‌های داخلی dropdown
const dropdownItemVariants = cva(
  "p-2 cursor-pointer transition-colors duration-200 rounded", // کلاس‌های پایه
  {
    variants: {
      hoverable: {
        true: "hover:bg-gray-100",
        false: "",
      },
      color: {
        primary: "hover:bg-gray-100 hover:text-primary",
        secondary: "hover:bg-secondary hover:text-black",
        warning: "hover:bg-warning hover:text-warning",
        danger: "hover:bg-error hover:text-white",
        inverse: "hover:bg-gray-600 hover:text-white",
        success: "hover:bg-success hover:text-white",
        purple: "hover:bg-purple-500 hover:text-white",
        default: "hover:bg-gray-500 hover:text-white",
      },
    },
    defaultVariants: {
      hoverable: true,
      color: "default", // رنگ پیش‌فرض
    },
  }
);

type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode; // می‌تواند آیتم‌های متعدد داشته باشد
  rounded?: RoundedType;
};

type DropdownItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  color?: keyof typeof dropdownItemVariants.variants.color;


};

export default function Dropdown({ trigger, children, rounded }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(dropdownVariants({ open: isOpen }))}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="cursor-pointer">{trigger}</div>
      <div className={cn(dropdownContentVariants({ open: isOpen, rounded }))}>
        {children}
      </div>
    </div>
  );
}

// کامپوننت جداگانه برای هر آیتم در dropdown
export function DropdownItem({ children, onClick, color = "default" }: DropdownItemProps) {
  return (
    <div onClick={onClick} className={cn(dropdownItemVariants({ color }))}>
      {children}
    </div>
  );
}
