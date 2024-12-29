import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { ColorType } from "../../types/GlobalType";
import { cn } from "../../utils";

type VariantType = ColorType;

const TabVariants = cva("tab text-center w-full overflow-hidden overflow-x-auto  ", {
    variants: {
        variant: {
            primary: "bg-primary",
            secondary: "bg-secondary",
            warning: "bg-warning",
            danger: "bg-error",
            success: "bg-success",
            inverse: "bg-gray-600",
            purple: "bg-purple-500",
            default: "bg-gray-500",
            white: "bg-primary",
        },
        rounded: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            full: "rounded-full",
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

    },
    defaultVariants: {
        rounded: "lg",
    },
});

const TabButtonVariants = cva(
    "tab-button text-base p-3 cursor-pointer transition-all duration-300 font-bold  w-full",
    {
        variants: {
            active: {
                true: "",
                false: "",
            },
            variant: {
                primary: "bg-primary ",
                secondary: "bg-secondary",
                warning: "bg-warning",
                danger: "bg-error",
                success: "bg-success",
                inverse: "bg-gray-600",
                purple: "bg-purple-500",
                default: "bg-gray-500",
                white: "bg-primary",
            },
            textcolor: {
                primary: "text-white ",
                secondary: "text-secondary",
                warning: "text-warning",
                danger: "text-error",
                success: "text-success",
                inverse: "text-gray-600",
                purple: "text-purple-500",
                default: "text-gray-500",
                white: "text-white",
            },
        },
        compoundVariants: [
            { active: true, variant: "primary", className: "bg-primary/10 text-primary " },
            { active: true, variant: "secondary", className: "bg-secondary/10 text-secondary" },
            { active: true, variant: "warning", className: "bg-warning/10 text-warning" },
            { active: true, variant: "danger", className: "bg-error/10 text-error" },
            { active: true, variant: "success", className: "bg-success/10 text-success" },
            { active: true, variant: "inverse", className: "bg-gray-600/10 text-gray-600" },
            { active: true, variant: "purple", className: "bg-purple-500/10 text-purple-500" },
            { active: true, variant: "default", className: "bg-gray-500/10 text-gray-500" },
            { active: true, variant: "white", className: "bg-white text-primary" },

        ],
        defaultVariants: {
            active: false,
            variant: "default",
            textcolor: "default",
        },
    }
);


const TabContentVariants = cva("tab-content p-6 border-t", {
    variants: {
        color: {
            primary: "border-primary ",
            secondary: "border-secondary ",
            warning: "border-warning ",
            danger: "border-error ",
            success: "border-success ",
            inverse: "border-gray-600 ",
            purple: "border-purple-500 ",
            default: "border-gray-300 ",
            white: "border-primary ",
        },
        textcolor: {
            primary: " text-primary",
            secondary: " text-secondary",
            warning: " text-warning",
            danger: " text-error",
            success: " text-success",
            inverse: " text-gray-600",
            purple: " text-purple-500",
            default: " text-gray-500",
            white: " text-primary",
        },
    },
    defaultVariants: {
        color: "default",
        textcolor: "default"
    },
});

type TabProps = {
    tabs: { name: string; content: string; variant?: VariantType; color?: ColorType; textcolor?: ColorType; bordercolor?: ColorType }[];
    active?: boolean;
    bordercolor?: ColorType;
};

const Tabs: React.FC<TabProps> = ({ tabs, active, bordercolor }) => {
    const [activeTab, setActiveTab] = useState(active ? 0 : -1);
    const border = bordercolor || tabs[activeTab]?.bordercolor || "default";

    return (
        <div className={TabVariants({ bordercolor: border })}>
            <div className="tab-buttons flex">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={cn(
                            " ", TabButtonVariants({
                                active: activeTab === index,
                                textcolor: tab.textcolor || "default",
                                variant: tab.variant || "default",
                            }))}

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
                        "",
                        TabContentVariants({
                            color: tab.color || "default",
                            textcolor: tab.textcolor || "default",
                        })
                    )}
                    style={{ display: activeTab === index ? "block" : "none" }}
                >
                    <h3>{tab.name}</h3>
                    <p>{tab.content}</p>
                </div>
            ))}
        </div>
    );
};



export default Tabs;