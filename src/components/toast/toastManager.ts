// toastManager.ts
type VariantType = "success" | "error" | "warning" | "info"
type PositionType = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center" | "top-center"

type Toast = {
      id: string;
      message: string;
      variant: VariantType
      position?: PositionType
      expireTime: number;
      iconMessage?: React.ReactNode;
};

type Listener = (toasts: Toast[]) => void;

let toasts: Toast[] = [];
let listeners: Listener[] = [];

export const toast = (
      message: string,
      variant: VariantType,
      position?: PositionType,
      expireTime = 5000,
      iconMessage?: React.ReactNode
) => {
      const id = Math.floor(Math.random() * 1000).toString()
      const newToast: Toast = { id, message, variant, position, expireTime, iconMessage };
      toasts.push(newToast);
      listeners.forEach((listener) => listener([...toasts]));

      // حذف خودکار toast پس از expireTime
      setTimeout(() => {
            removeToast(id);
      }, expireTime);
};

export const removeToast = (id: string) => {
      toasts = toasts.filter((toast) => toast.id !== id);
      listeners.forEach((listener) => listener([...toasts]));
};

// برای ثبت یا حذف شنوندگان (Listeners)
export const subscribe = (listener: Listener) => {
      listeners.push(listener);
      return () => {
            listeners = listeners.filter((l) => l !== listener);
      };
};
