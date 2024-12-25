import React, { useState } from "react";
import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";
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

const dropdownContentVariants = cva(
  "absolute hidden bg-white text-black shadow-lg p-4 z-10 max-h-[12.25rem] overflow-y-auto",
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
      position: {
        left: "left-0",
        right: "right-0",
        center: "left-1/2 transform -translate-x-1/2",
      },
      minWidth: {
        sm: "min-w-[6.25rem]",
        md: "min-w-[140px]",
        lg: "min-w-[12.25rem]",
        full : "min-w-full",
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
  "p-2 cursor-pointer transition-colors duration-200 rounded",
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
        purple: "hover:bg-purple-500 hover:text-white",
        default: "hover:bg-gray-500 hover:text-white",
        white: "hover:bg-white hover:text-black",
      },
    },
    defaultVariants: {
      hoverable: true,
      color: "default",
    },
  }
);

const dropdownTriggerVariants = cva(
  "cursor-pointer flex justify-center items-center gap-2 px-4 transition-all duration-300 min-w-[180px] rounded-full disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none",
  {
    variants: {
      color: {
        primary:
          "bg-primary hover:bg-white text-white hover:text-primary hover:border hover:border-primary",
        primary_outlined: "border border-primary bg-transparent text-primary hover:bg-primary hover:text-white ",

        secondary: "bg-secondary hover:bg-white text-white hover:text-secondary hover:border hover:border-secondary",
        secondary_outlined: "border border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-white ",

        warning:
          "bg-warning hover:bg-white text-white hover:text-warning hover:border hover:border-warning",
        warning_outlined: "border border-warning bg-transparent text-warning hover:bg-warning hover:text-white ",
        danger:
          "bg-error hover:bg-white text-white hover:text-error hover:border hover:border-error",
        danger_outlined: "border border-error bg-transparent text-error hover:bg-error hover:text-white ",

        inverse:
          "bg-gray-600 hover:bg-white text-white hover:text-gray-600 hover:border hover:border-gray-600",
        inverse_outlined: "border border-gray-600 bg-transparent text-gray-600 hover:bg-gray-600 hover:text-white ",

        success:
          "bg-success hover:bg-white text-white hover:text-success hover:border hover:border-success",
        success_outlined: "border border-success bg-transparent text-success hover:bg-success hover:text-white ",

        purple:
          "bg-purple-500 hover:bg-white text-white hover:text-purple-500 hover:border hover:border-purple-500",
        purple_outlined: "border border-purple-500 bg-transparent text-purple-500 hover:bg-purple-500 hover:text-white ",

        default:
          "bg-gray-500 hover:bg-white text-white hover:text-gray-500 hover:border hover:border-gray-500",
        default_outlined: "border border-gray-500 bg-transparent text-gray-500 hover:bg-gray-500 hover:text-white ",
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
type DropdownContentVariants = {
  rounded: "sm" | "md" | "lg" | "full";
  open: "true" | "false";
  position: "left" | "right" | "center";
  minWidth: "sm" | "md" | "lg" | "custom";
};

type DropdownTriggerVariants = {
  color:
  | "primary"
  | "primary_outlined"
  | "secondary"
  | "secondary_outlined"
  | "warning"
  | "warning_outlined"
  | "danger"
  | "danger_outlined"
  | "inverse"
  | "inverse_outlined"
  | "success"
  | "success_outlined"
  | "purple"
  | "purple_outlined"
  | "default"
  | "default_outlined";
  size: "sm" | "md" | "lg";
};



type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  rounded?: DropdownContentVariants["rounded"];
  triggerColor?: DropdownTriggerVariants["color"];
  position?: DropdownContentVariants["position"];
  minWidth?: DropdownContentVariants["minWidth"];
  customMinWidth?: string;
  color?: string;
};



type DropdownItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  position?: DropdownContentVariants["position"];
  color?: DropdownTriggerVariants["color"];
  CloseDropdown?: () => void;
};

export default function Dropdown({
  trigger,
  children,
  rounded,
  triggerColor,
  position,
  minWidth = "md",
  customMinWidth,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const CloseDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={cn(dropdownVariants({ open: isOpen }))}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={cn(dropdownTriggerVariants({ color: triggerColor }))}
        onClick={toggleDropdown}
      >
        {trigger}
      </div>
      <div
        className={cn(
          dropdownContentVariants({
            open: isOpen,
            rounded,
            position: position as "left" | "right" | "center",
            minWidth: customMinWidth
              ? "custom"
              : (minWidth as "sm" | "md" | "lg" | "custom"),
          }),
          customMinWidth,

        )}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement<DropdownItemProps>(child)
            ? React.cloneElement(child, { CloseDropdown })
            : child
        )}
      </div>
    </div>
  );
}




export function DropdownItem({
  children,
  onClick,
  color = "default",
  CloseDropdown,
}: DropdownItemProps & { CloseDropdown?: () => void }) {
  const handleClick = () => {
    if (onClick) onClick();
    if (CloseDropdown) CloseDropdown();
  };

  return (
    <div onClick={handleClick} className={cn(dropdownItemVariants({ color: color as never }))}>
      {children}
    </div>
  );
}
