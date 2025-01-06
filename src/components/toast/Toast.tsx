import React, { createContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
// import ReactDOM from "react-dom";
import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";
import { subscribe, toast } from './toastManager';

type VariantType = "success" | "error" | "warning" | "info"
type PositionType = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center" | "top-center"
// استایل‌های Toast
const toastStyles = cva(
  "shadow-lg modal_animation flex items-center justify-between gap-2 p-4 text-sm pointer-events-auto z-[1000] transition-all duration-300 w-[20rem] h-[3.75rem] overflow-y-auto  ",
  {
    variants: {
      variant: {
        success: "bg-primary text-white",
        error: "bg-red-500 text-white",
        warning: "bg-yellow-500 text-white",
        info: "bg-blue-500 text-white",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },

    },
    defaultVariants: {
      variant: "info",
      rounded: "md",
    },
  }
);

type ToastType = {
  id: string;
  message: string;
  variant: VariantType
  onClose: (id: string) => void;
  expireTime: number;
  iconMessage?: ReactNode
}


// Toast Component
const Toast = ({ id, message, variant, onClose, expireTime = 5000, iconMessage }: ToastType) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), expireTime); // خودکار بسته شدن
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={cn(toastStyles({ variant }))}>
      {iconMessage && <div className="w-fit">{iconMessage}</div>}
      <span className="flex-1">{message}</span>
      <button onClick={() => onClose(id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-white cursor-pointer hover:text-gray-300"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};




export const ToastProvider: React.FC<{
  children?: React.ReactNode;
  position?: PositionType
  expireTime?: number
  iconMessage?: ReactNode
}> = ({ position = "top-right", expireTime = 5000 }) => {
  const [toasts, setToasts] = useState<{
    id: string,
    message: string,
    variant: VariantType,
    expireTime: number,
    position?: PositionType,
    iconMessage?: ReactNode
  }[] | []>([]);


  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);
  useEffect(() => {
    const unsubscribe = subscribe((newToasts) => {
      setToasts(newToasts);
    });
    return unsubscribe;
  }, []);
  const filteredToasts = useMemo(() => ({
    topLeft: toasts.filter((toast) => toast.position ? toast.position === "top-left" : position === "top-left"),
    topRight: toasts.filter((toast) => toast.position ? toast.position === "top-right" : position === "top-right"),
    topCenter: toasts.filter((toast) => toast.position ? toast.position === "top-center" : position === "top-center"),
    bottomLeft: toasts.filter((toast) => toast.position ? toast.position === "bottom-left" : position === "bottom-left"),
    bottomRight: toasts.filter((toast) => toast.position ? toast.position === "bottom-right" : position === "bottom-right"),
    bottomCenter: toasts.filter((toast) => toast.position ? toast.position === "bottom-center" : position === "bottom-center"),
  }), [toasts, position]);

  return (
    <div className="fixed z-[1000] size-full top-0 left-0 p-4 pointer-events-none	space-y-2 overflow-y-auto h-screen ">
      {filteredToasts.topLeft.length ? (
        <div className="absolute top-0 left-0 space-y-2 p-4">
          {filteredToasts.topLeft.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={removeToast} expireTime={expireTime} />
          ))}
        </div>
      ) : null}
      {filteredToasts.topRight.length ? (
        <div className="absolute top-0 right-0 space-y-2 p-4">
          {filteredToasts.topRight.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={removeToast} expireTime={expireTime} />
          ))}
        </div>
      ) : null}
      {filteredToasts.topCenter.length ? (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 space-y-2 p-4">
          {filteredToasts.topCenter.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={removeToast} expireTime={expireTime} />
          ))}
        </div>
      ) : null}
      {filteredToasts.bottomCenter.length ? (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 space-y-2 p-4">
          {filteredToasts.bottomCenter.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={removeToast} expireTime={expireTime} />
          ))}
        </div>
      ) : null}
      {filteredToasts.bottomLeft.length ? (
        <div className="absolute bottom-0 left-0 space-y-2 p-4">
          {filteredToasts.bottomLeft.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={removeToast} expireTime={expireTime} />
          ))}
        </div>
      ) : null}
      {filteredToasts.bottomRight.length ? (
        <div className="absolute bottom-0 right-0 space-y-2 p-4">
          {filteredToasts.bottomRight.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={removeToast} expireTime={expireTime} />
          ))}
        </div>
      ) : null}

      {/* {toasts.filter((toast) => toast.position ? toast.position === "top-right" : position === "top-right").length ? (

        <div className="absolute top-0 right-0 space-y-2 p-4">
          {toasts
            .filter((toast) => toast.position ? toast.position === "top-right" : position === "top-right")
            .map((toast) => (
              <Toast key={toast.id} {...toast} onClose={removeToast} expireTime={expireTime} />
            ))}
        </div>
      ) : null}
      {toasts.filter((toast) => toast.position ? toast.position === "top-center" : position === "top-center").length ? (

        <div className="absolute top-0 left-1/2 -translate-x-1/2 space-y-2 p-4">
          {toasts
            .filter((toast) => toast.position ? toast.position === "top-center" : position === "top-center")
            .map((toast) => (
              <Toast key={toast.id} {...toast} onClose={removeToast} expireTime={expireTime} />
            ))}
        </div>
      ) : null}
      {toasts.filter((toast) => toast.position ? toast.position === "bottom-left" : position === "bottom-left").length ? (

        <div className="absolute bottom-0 left-0 space-y-2 p-4">
          {toasts
            .filter((toast) => toast.position ? toast.position === "bottom-left" : position === "bottom-left")
            .map((toast) => (
              <Toast key={toast.id} {...toast} onClose={removeToast} expireTime={expireTime} />
            ))}
        </div>
      ) : null}
      {toasts.filter((toast) => toast.position ? toast.position === "bottom-right" : position === "bottom-right").length ? (

        <div className="absolute bottom-0 right-0 space-y-2 p-4">
          {toasts
            .filter((toast) => toast.position ? toast.position === "bottom-right" : position === "bottom-right")
            .map((toast) => (
              <Toast key={toast.id} {...toast} onClose={removeToast} expireTime={expireTime} />
            ))}
        </div>
      ) : null}
      {toasts.filter((toast) => toast.position ? toast.position === "bottom-center" : position === "bottom-center").length ? (

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 space-y-2 p-4">
          {toasts
            .filter((toast) => toast.position ? toast.position === "bottom-center" : position === "bottom-center")
            .map((toast) => (
              <Toast key={toast.id} {...toast} onClose={removeToast} expireTime={expireTime} />
            ))}
        </div>
      ) : null} */}
    </div>
  );
};

