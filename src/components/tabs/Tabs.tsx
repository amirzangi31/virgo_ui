import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { ColorType } from "../../types/GlobalType";
import { cn } from "../../utils";

type VariantType = ColorType;

const TabButtonVariants = cva(
    "tab-button text-base p-3 cursor-pointer transition-all duration-300 font-bold w-full",
    {
        variants: {
            active: {
                true: "",
                false: "",
            },
            variant: {
                primary: "bg-primary/30",
                secondary: "bg-secondary/30",
                warning: "bg-warning/30",
                danger: "bg-error/30",
                success: "bg-success/30",
                inverse: "bg-gray-600/30",
                purple: "bg-purple-500/30",
                default: "bg-gray-500/30",
                white: "bg-primary/30",
            },
            bordercolor: {
                primary: "border-primary",
                secondary: "border-secondary",
                warning: "border-warning",
                danger: "border-error",
                success: "border-success",
                inverse: "border-gray-600",
                purple: "border-purple-500",
                default: "border-gray-500",
                white: "border-primary",
            },
            textcolor: {
                primary: "text-primary",
                secondary: "text-secondary",
                warning: "text-warning",
                danger: "text-error",
                success: "text-success",
                inverse: "text-gray-600",
                purple: "text-purple-500",
                default: "text-gray-500",
                white: "text-white",
            },
            rounded: {
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                full: "rounded-full",
            },
            styles: {
                flat: "bg-transparent border-none",
                bordered: "border border-gray-300 bg-transparent",
                underlined: "border-b border-gray-300 bg-transparent",
                faded: "border border-gray-300 bg-gray-100/50"},
        },
        compoundVariants: [
            { active: true, variant: "primary", className: "bg-primary/5 text-primary" },
            { active: true, variant: "secondary", className: "bg-secondary/5 text-secondary" },
            { active: true, variant: "warning", className: "bg-warning/5 text-warning" },
            { active: true, variant: "danger", className:"bg-error/5 text-error"},
            { active: true, variant: "success", className: "bg-success/5 text-success" },
            { active: true, variant: "inverse", className: "bg-gray-600/5 text-gray-600" },
            { active: true, variant: "purple", className: "bg-purple-500/5 text-purple-500" },
            { active: true, variant: "default", className: "bg-gray-500/5 text-gray-500" },
            {active: true,  variant: "white", className:"bg-white text-primary" },
           
        ],
    
        defaultVariants: {
            active: false,
            textcolor: "default",
        },
    }
);

const TabContentVariants = cva("tab-content px-6 border-2 border-red-400 text-center transition-all duration-300 opacity-0 transform scale-95 hidden", {
    variants: {
        color: {
            primary: "border-primary",
            secondary: "border-secondary",
            warning: "border-warning",
            danger: "border-error",
            success: "border-success",
            inverse: "border-gray-600",
            purple: "border-purple-500",
            default: "border-gray-300",
            white: "border-primary",
        },
        contentcolor: {
            primary: "text-primary",
            secondary: "text-secondary",
            warning: "text-warning",
            danger: "text-error",
            success: "text-success",
            inverse: "text-gray-600",
            purple: "text-purple-500",
            default: "text-gray-500",
            white: "text-primary",
        },
    },
    defaultVariants: {
        contentcolor: "default",
    },
});

type TabProps = {
    tabs: {
        styles?: "flat" | "bordered" | "underlined" | "faded";
        name: string;
        content: string;
        variant?: VariantType;
        color?: ColorType;
        textcolor?: ColorType;
        contentcolor?: ColorType;
        bordercolor?: ColorType;
    }[];
    active?: boolean;
};

const Tabs: React.FC<TabProps> = ({ tabs, active }) => {
    const [activeTab, setActiveTab] = useState(active ? 0 : -1);

    return (
        <div className="tabs-container">
            <div className="tab-buttons flex ">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={cn(
                            TabButtonVariants({
                                active: activeTab === index,
                                textcolor: tab.textcolor || "default",
                                variant: tab.variant,
                                styles:tab.styles
                            }),
                            {
                                [`border-b-4 ${tab.bordercolor}`]: activeTab === index,
                            }
                        )}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            {tabs.map((tab, index) => (
                <div
                    key={index}
                    className={cn(
                        TabContentVariants({
                            color: tab.color || "default",
                            contentcolor: tab.contentcolor || "default",
                        }),
                        {"opacity-100 transform scale-100 block border-none": activeTab === index,
                        })}
                >
                    <p>{tab.name}</p>
                    <p>{tab.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Tabs;
