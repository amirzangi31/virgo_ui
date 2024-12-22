import { cva } from "class-variance-authority";
import { ReactNode } from "react";
import { cn } from "../../utils";

type SiderbarDropdownProps = SiderbarDropdownVariantsProps & {
      title: string;
      icon?: ReactNode;
      arrowIcon?: ReactNode;
      isOpen: boolean;
      children: ReactNode;
      open: boolean;
      handler: () => void; // handler برای تغییر وضعیت
};

type SidebarItemVariantsFunction = (props: SiderbarDropdownVariantsProps) => string;

const SidebarItemVariants: SidebarItemVariantsFunction = cva(
      "w-full flex justify-between items-center gap-2 relative py-2 after:absolute after:bottom-0 after:right-1/2 after:w-0 after:h-[2px] after:bg-primary after:block hover:after:w-full hover:after:right-0 after:rounded-xl after:transition-all after:duration-500 cursor-pointer hover:text-primary transition-color duration-300",
      {
            variants: {
                  isOpen: {
                        true: "justify-between",
                        false: "justify-center",
                  },
            },
            defaultVariants: {},
      }
);

type SiderbarDropdownVariantsProps = {
      isOpen: boolean;
};

const SidebarDropdown = ({
      title,
      icon,
      arrowIcon,
      isOpen,
      children,
      open,
      handler,
}: SiderbarDropdownProps) => {
      return (
            <>
                  <button type="button"
                        className={cn(SidebarItemVariants({ isOpen }))}
                        onClick={handler} 
                  >
                        {icon} {isOpen && title}{" "}
                        {isOpen ? (
                              arrowIcon || (
                                    <svg
                                          width="10"
                                          height="16"
                                          viewBox="0 0 10 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className={cn("stroke-primary -rotate-90", {
                                                "-rotate-90": !open,
                                                "rotate-90": open,
                                          })}
                                    >
                                          <path
                                                d="M8.5 15L1.5 8L8.5 1"
                                                className="stroke-primary"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                          />
                                    </svg>
                              )
                        ) : null}
                  </button>
                  {open && <div className="flex justify-start items-start gap-2 px-4">{children}</div>}
            </>
      );
};

export default SidebarDropdown;
