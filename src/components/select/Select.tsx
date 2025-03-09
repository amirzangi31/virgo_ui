import React, { useState, useEffect, useRef } from "react";
import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";
import { ColorType, SizeType, SvgColorType } from "../../types/GlobalType";


type variant = ColorType
type size = SizeType
type svgcolor = SvgColorType

const selectVariants = cva("relative inline-block w-full ", {
    variants: {
        borderstyle: {
            flat: "bg-transparent border-none",
            bordered: "border border-gray-300",
            faded: "bg-gray-100 border border-gray-200",
        },
        borderColor: {
            primary: "border-primary border-2",
            secondary: "border-secondary border-2",
            warning: "border-warning border-2",
            danger: "border-error border-2",
            success: "border-success border-2",
            inverse: "border-inverse-600 border-2",
            purple: "border-purple-500 border-2",
            default: "border-gray-500 border-2",
            white: "border-white border-2",
        },
        underlinedColor: {
            primary: "border-primary border-b rounded-none  ",
            secondary: "border-secondary border-b rounded-none",
            warning: "border-warning border-b rounded-none",
            danger: "border-error border-b rounded-none",
            success: "border-success border-b rounded-none",
            inverse: "border-inverse-600 border-b rounded-none",
            purple: "border-purple-500 border-b rounded-none",
            default: "border-gray-500 border-b rounded-none",
            white: "border-white border-b rounded-none",
        },
        svgColor: {
            primary: "stroke-primary",
            secondary: "stroke-secondary",
            warning: "stroke-warning",
            danger: "stroke-error",
            inverse: "stroke-gray-600",
            success: "stroke-success",
            purple: "stroke-purple-500",
            default: "stroke-gray-500",
            white: "stroke-white"
        },
        textColor: {
            primary: "text-primary",
            secondary: "text-secondary",
            warning: "text-warning",
            danger: "text-error",
            inverse: "text-gray-600",
            success: "text-success",
            purple: "text-purple-500",
            default: "text-gray-500",
            white: "text-white"
        },

        rounded: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            full: "rounded-full",
        },

    },
    defaultVariants: {



    },
});

const selectContentVariants = cva(
    "transition-all duration-300 bg-white shadow-lg p-2 z-10 max-h-[12.25rem] overflow-y-auto flex justify-start items-center gap-1 flex-col",
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
                center: "left-0 right-0 ",
                top: "top-0",
            },
            minWidth: {
                sm: "min-w-[6.25rem]",
                md: "min-w-[140px]",
                lg: "min-w-[18.25rem]",
                full: "min-w-full",
                custom: "",
            },
        },
        defaultVariants: {
            open: false,

        },
    }
);

const selectItemVariants = cva(
    "p-2 cursor-pointer transition-colors duration-200 rounded w-full flex justify-center items-center text-center",
    {
        variants: {
            hoverable: {
                true: "",
                false: "",
            },
            rounded: {
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                full: "rounded-full",
            },
            color: {
                primary: "hover:text-primary text-primary hover:border-b-2 hover:border-primary transition-all duration-300 ",
                secondary: "hover:text-secondary text-secondary hover:border-b-2 hover:border-secondary transition-all duration-300 ",
                warning: "hover:text-warning text-warning hover:border-b-2 hover:border-warning transition-all duration-300 ",
                danger: "hover:text-error text-error hover:border-b-2 hover:border-error transition-all duration-300 ",
                inverse: "hover:text-gray-600 text-gray-600 hover:border-b-2 hover:border-gray-600 transition-all duration-300 ",
                success: "hover:text-success text-success hover:border-b-2 hover:border-success transition-all duration-300 ",
                default: "hover:text-gray-500 text-gray-500 hover:border-b-2 hover:border-gray-500 transition-all duration-300 ",
                purple: "hover:text-purple-500 text-purple-500 hover:border-b-2 hover:border-purple-500 transition-all duration-300",
                white: "hover:text-primary border-b-2 border-white",
            },
        },
        defaultVariants: {
            hoverable: true,

        },
    }
);

type SelectProps = {
    options: { label: string; value: string | number }[];
    value?: string | number;
    onChange?: (value: string | number) => void;
    placeholder?: string;
    rounded?: size;
    position?: "left" | "right" | "center";
    borderstyle?: "flat" | "bordered" | "faded";
    minWidth?: size;
    customMinWidth?: string;
    colorItem?: variant;
    svgColor?: svgcolor;
    borderColor?: ColorType;
    classname?:string;
    textColor?: ColorType;
    underlinedColor?: ColorType;
    icon?: React.ReactNode;
};

const Select: React.FC<SelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    position,
    borderColor,
    borderstyle,
    svgColor,
    rounded,
    textColor,
    underlinedColor,
    customMinWidth,
    colorItem,
    classname,
    icon = <svg width="10" height="16" viewBox="0 0 10 16" fill="none" className=" rotate-180" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1L8.5 8L1.5 15" strokeWidth="1.5"

    ></path></svg>,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: "100%", left: 0 });
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (isOpen && buttonRef.current && dropdownRef.current) {
            const buttonRect = (buttonRef.current as HTMLButtonElement).getBoundingClientRect();
            const dropdownHeight = (dropdownRef.current as HTMLDivElement).offsetHeight;
            const shouldOpenUp = buttonRect.bottom + dropdownHeight > window.innerHeight;
            setDropdownPosition({
                top: shouldOpenUp ? `-${dropdownHeight + 5}px` : "100%",
                left: 0,
            });
        }
    }, [isOpen]);
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (value: string | number) => {
        if (onChange) {
            onChange(value);
        }
        setIsOpen(false);
    };

    return (
        <div className={cn(selectVariants({ borderstyle, borderColor, rounded, textColor, underlinedColor }), "relative", isOpen , classname)}>
            {/* <span 
            
            className="absolute top-0 right-2 -translate-y-1/2 px-3 py-0.5 text-nowrap text-xs  bg-[#E6E9E8] text-gray-500 font-medium transition-all duration-200">
                {placeholder}
            </span> */}
            {isOpen && (
                <span onClick={toggleDropdown} className="fixed top-0 left-0 size-full block"></span>
            )}

            <button
                type="button"
                ref={buttonRef}
                className={cn(
                    "flex justify-between items-center gap-2 px-4 py-2 transition-all duration-300 w-full min-w-[150px] cursor-pointer",
                    selectVariants({ borderstyle })
                )}
                onClick={toggleDropdown}
            >
                <div className="flex justify-between items-center w-full gap-2">
                    <span className="truncate">
                        {value ? options.find((opt) => opt.value === value)?.label : placeholder}
                    </span>
                    <div className={cn(`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`, selectVariants({ svgColor }))}>
                        {icon}
                    </div>
                </div>
            </button>

            <div
                style={customMinWidth ? { minWidth: customMinWidth } : undefined}
                className="py-2 absolute w-full z-50"
            >
                <div
                    ref={dropdownRef}
                    className={cn(selectContentVariants({ open: isOpen, position, rounded }))}
                    style={{
                        position: "absolute",
                        top: dropdownPosition.top,
                        left: dropdownPosition.left,
                        zIndex: 9999,
                        width: '100%',
                        maxWidth: '100vw'
                    }}
                >
                    {options.map((option) => (
                        <button
                            type="button"
                            onClick={() => handleOptionClick(option.value)}
                            key={option.value}
                            className={cn(
                                selectItemVariants({ color: colorItem }),
                                "w-full truncate text-left  text-black",

                            )}
                            title={option.label}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Select;