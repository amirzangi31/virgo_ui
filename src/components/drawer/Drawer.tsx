import React from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { ColorType, SizeType } from "../../types/GlobalType";
import IconButton from "../ButtonClose/ButtonClose";


type variant = ColorType;

const drawerVariants = cva(
  "fixed transition-transform z-50 shadow-lg",
  {
    variants: {
      size: {
        sm: "w-1/4 h-full",
        md: "w-1/3 h-full",
        lg: "w-1/2 h-full",
        full: "w-full h-full",
      },
      variant: {
        primary: "bg-primary text-white",
        warning: "bg-warning text-white",
        danger: "bg-error text-white",
        inverse: "bg-gray-600 text-white",
        success: "bg-success text-white",
        purple: "bg-purple-500 text-white",
        default: "bg-gray-500 text-white",
        secondary: "bg-gray-400 text-white",
      },

      position: {
        right: "top-0 right-0 h-full",
        left: "top-0 left-0 h-full",
        top: "top-0 left-0 w-full h-auto",
        bottom: "bottom-0 left-0 w-full h-auto",
      },
    },
    defaultVariants: {
      size: "md",
      position: "right",
    },
  }
);


type CustomDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  size?: SizeType;
  variant?: variant;
  position?: "left" | "right" | "top" | "bottom";
  icon?: React.ReactNode;
};

const CustomDrawer: React.FC<CustomDrawerProps> = ({ isOpen, onClose, children, className, size, position, icon }) => {
  return (
    <div
      className={clsx(
        "fixed bg-white shadow-xl transform transition-transform ease-in-out duration-300",
        position === "right" && (isOpen ? "translate-x-0" : "translate-x-full"),
        position === "left" && (isOpen ? "translate-x-0" : "-translate-x-full"),
        position === "top" && (isOpen ? "translate-y-0" : "-translate-y-full"),
        position === "bottom" && (isOpen ? "translate-y-0" : "translate-y-full"),
        drawerVariants({ size, position }),
        className
      )}
    >
      <div className="p-6">{children}</div>
      <button
        className="absolute top-4 left-4 text-black text-xl"
        onClick={onClose}
      >
        {icon || <IconButton />}
      </button>
    </div>
  );
};

export default CustomDrawer;
