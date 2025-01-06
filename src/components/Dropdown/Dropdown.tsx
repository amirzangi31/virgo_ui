import React, { useState } from "react";
import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";
import { ColorType } from "../../types/GlobalType";

const dropdownVariants = cva("relative inline-block peer-checked:dropdown-open", {
  variants: {

  },
  defaultVariants: {
    open: false,
  },
});

const dropdownContentVariants = cva(
  "transtion-all duration-300  bg-white text-black shadow-lg p-2 z-10 max-h-[12.25rem] overflow-y-auto flex justify-start items-center gap-1 flex-col",
  {
    variants: {
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      open: {
        true: "flex",
        false: "hidden",
      },
      position: {
        left: "left-0",
        right: "right-0",
        center: "left-1/2 transform -translate-x-1/2",
      },
      minWidth: {
        sm: "min-w-[6.25rem]",
        md: "min-w-[140px]",
        lg: "min-w-[12.25rem]",
        full: "min-w-full",
        custom: "",
      },
    },
    defaultVariants: {
      open: false,
      rounded: "lg",
      position: "left",
      minWidth: "full",
    },
  }
);

const dropdownItemVariants = cva(
  "p-2 cursor-pointer transition-colors duration-200 rounded w-full flex justify-center items-center text-center",
  {
    variants: {
      hoverable: {
        true: "hover:bg-gray-100",
        false: "",
      },
      color: {
        primary: "hover:bg-primary hover:text-white",
        secondary: "hover:bg-secondary hover:text-white",
        warning: "hover:bg-warning hover:text-black",
        danger: "hover:bg-error hover:text-white",
        inverse: "hover:bg-gray-600 hover:text-white",
        success: "hover:bg-success hover:text-white",
        default: "hover:bg-gray-500 hover:text-white",
        purple: "hover:bg-purple-500 hover:text-white",
        white: 'hover:bg-white hover:text-primary',
      },
    },
    defaultVariants: {
      hoverable: true,
      color: "default",
    },
  }
);

const dropdownTriggerVariants = cva(
  "flex justify-center items-center gap-2 px-4  transition-all duration-300 min-w-fit md:min-w-[11.25rem]   cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none",

  {
    variants: {
      color: {
        primary:
          "bg-primary hover:bg-white text-white hover:text-primary hover:border hover:border-primary",
        primary_outlined: "border border-primary bg-primary text-primary hover:bg-primary hover:text-white ",

        secondary: "bg-secondary hover:bg-white text-white hover:text-secondary hover:border hover:border-secondary",
        secondary_outlined: "border border-secondary bg-secondary text-secondary hover:bg-secondary hover:text-white ",

        warning:
          "bg-warning hover:bg-white text-white hover:text-warning hover:border hover:border-warning",
        warning_outlined: "border border-warning bg-warning text-warning hover:bg-warning hover:text-white ",
        danger:
          "bg-error hover:bg-white text-white hover:text-error hover:border hover:border-error",
        danger_outlined: "border border-error bg-danger text-error hover:bg-error hover:text-white ",

        inverse:
          "bg-gray-600 hover:bg-white text-white hover:text-gray-600 hover:border hover:border-gray-600",
        inverse_outlined: "border border-gray-600 bg-inverse text-gray-600 hover:bg-gray-600 hover:text-white ",

        success:
          "bg-success hover:bg-white text-white hover:text-success hover:border hover:border-success",
        success_outlined: "border border-success bg-success text-success hover:bg-success hover:text-white ",

        purple:
          "bg-purple-500 hover:bg-white text-white hover:text-purple-500 hover:border hover:border-purple-500",
        purple_outlined: "border border-purple-500 bg-purple text-purple-500 hover:bg-purple-500 hover:text-white ",

        default:
          "bg-gray-500 hover:bg-white text-white hover:text-gray-500 hover:border hover:border-gray-500",
        default_outlined: "border border-gray-500 bg-default text-gray-500 hover:bg-gray-500 hover:text-white ",

        white:
          "bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-500 hover:border hover:border-gray-500",
      },
      size: {
        sm: "h-[2.5rem]",
        md: "h-[3rem]",
        lg: "h-[3.5rem]",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "sm",
    },
  }
);

type DropdownProps = {
  name?: string,
  trigger: React.ReactNode;
  rounded?: "sm" | "md" | "lg" | "full";
  triggerColor?: "primary" | "primary_outlined" | "secondary" | "secondary_outlined" | "warning" | "warning_outlined" | "danger" | "danger_outlined" | "inverse" | "inverse_outlined" | "success" | "success_outlined" | "purple" | "purple_outlined" | "default" | "default_outlined" | "white";
  position?: "left" | "right" | "center";
  minWidth?: "sm" | "md" | "lg" | "custom" | "full";
  customMinWidth?: string;
  contentClassName?: string;
  content: { name: string | number | boolean, value: string | number }[],
  itemHandler?: (item: any) => void
  colorItem?: ColorType
};

export default function Dropdown({
  trigger,
  rounded = "lg",
  triggerColor = "primary",
  colorItem,
  position = "left",
  minWidth = "full",
  customMinWidth,
  content,
  itemHandler,
  contentClassName
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };


  return (
    <div
      className={cn(dropdownVariants())}
    >
      {isOpen && <span onClick={toggleDropdown} className="fixed top-0 left-0 size-full block z-[10] "></span>}
      <button
        type="button"
        className={cn(dropdownTriggerVariants({ color: triggerColor }))}
        onClick={toggleDropdown}
      >
        {trigger}
      </button>


      <div
        style={customMinWidth ? { minWidth: customMinWidth } : undefined}
        className={cn(
          "py-2 absolute w-full  z-10",
          contentClassName
        )}

      >
        <div
          className={cn(
            dropdownContentVariants({
              open: isOpen,
              rounded,
              position,
              minWidth: customMinWidth ? "custom" : minWidth,
            }),
          )}>

          {content.map((item: { name: string | number | boolean, value: string | number }) => (
            <button
              type="button"
              onClick={() => {
                if (itemHandler) itemHandler(item)
                toggleDropdown()
              }}
              key={item.value}
              className={cn(dropdownItemVariants({ color: colorItem }))}
            >
              {item.name}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

type DropdownItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  color?: "primary" | "secondary" | "default";
};

export function DropdownItem({
  children,
  onClick,
  color = "default",
}: DropdownItemProps) {

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(dropdownItemVariants({ color }))}
    >
      {children}
    </button>
  );
}
