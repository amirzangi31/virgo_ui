import { createPortal } from "react-dom";
import { useRef, useEffect, useState, ReactNode } from "react";

type ClientOnlyPortalType = {
      selector: string
      children: ReactNode
}


export default function ClientOnlyPortal({ children, selector }: ClientOnlyPortalType) {
      const ref = useRef<HTMLDivElement | null>(null);
      const [mounted, setMounted] = useState(false);

      useEffect(() => {
            ref.current = document.querySelector(selector);
            if (ref.current) {
                  setMounted(true);
            } else {
                  ref.current = document.createElement('div');
                  ref.current.id = 'modal';
                  document.body.appendChild(ref.current);
                  setMounted(true);
            }
      }, [selector]);

      return mounted ? createPortal(children, ref.current!) : null;
}