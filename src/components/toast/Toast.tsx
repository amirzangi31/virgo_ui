import React, { useState, useEffect } from "react";
import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";
import { ColorType, RoundedType } from "../../types/GlobalType";

type ToastVariantsProps = {
  variant?: ColorType;
  rounded?: RoundedType;
  autoClose?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
};

type ToastProps = ToastVariantsProps & {
  id: number;
  title: string;
  message: string;
  iconmessage?: JSX.Element;
  iconclose?: JSX.Element;
  maxWidth?: "sm" | "md" | "lg";
  onClose: (id: number) => void;
  expireAt?: number; 
};

const toastStyles = cva(
  "animate-opacity shadow-shadow_toast w-full flex items-center h-[3.75rem] justify-between px-4 text-md pointer-events-auto z-[100] transition-all duration-300",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        warning: "bg-warning text-white",
        danger: "bg-error text-white",
        success: "bg-success text-white",
        inverse: "bg-gray-600 text-white",
        purple: "bg-purple-500 text-white",
        default: "bg-gray-500 text-white",
        white: "bg-white text-primary",
      },
      maxWidth: {
        sm: "max-w-[25rem]",
        md: "max-w-[45rem]",
        lg: "max-w-[65rem]",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "danger",
      maxWidth: "lg",
      rounded: "md",
    },
  }
);

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  iconmessage,
  iconclose,
  onClose,
  variant,
  rounded,
  autoClose,
  maxWidth,
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => onClose(id), autoClose);
      return () => clearTimeout(timer);
    }
  }, [id, autoClose, onClose]);

  return (
    <div className={cn(toastStyles({ variant, rounded, maxWidth }))}>
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-2 p-2">
          {iconmessage && <div className="mr-2">{iconmessage}</div>}
          {message}
        </div>
        {iconclose && (
          <div onClick={() => onClose(id)} className="top-5 left-5">
            {iconclose}
          </div>
        )}
      </div>
    </div>
  );
};

type ToastManagerProps = {
  initialToasts: Array<Omit<ToastProps, "id" | "onClose" | "expireAt">>;
};

const ToastManager: React.FC<ToastManagerProps> = ({ initialToasts }) => {
  const [toasts, setToasts] = useState<Array<ToastProps>>([]);
  const position = initialToasts[0]?.position || "top-right";

  useEffect(() => {
    const mappedToasts = initialToasts.map((toast, index) => ({
      ...toast,
      id: Date.now() + index,
      expireAt: Date.now() + (toast.autoClose || 1000),
      onClose: removeToast,
    }));
    setToasts((prevToasts) => [...prevToasts, ...mappedToasts]);
  }, [initialToasts]);
  


  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.expireAt! > now) 
      );
    }, 500); 
  
    return () => clearInterval(interval); 
  }, []);
  


  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };



  const positionStyles = {
    "top-left": "top-5 left-5",
    "top-right": "top-5 right-5",
    "bottom-left": "bottom-5 left-5",
    "bottom-right": "bottom-5 right-5",
  };

  return (
    <div className={`fixed ${positionStyles[position]} space-y-4`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastManager;
