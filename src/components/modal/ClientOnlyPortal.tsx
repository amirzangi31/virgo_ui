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
            setMounted(true);
      }, [selector]);

      return mounted ? createPortal(children, ref.current!) : null;
}