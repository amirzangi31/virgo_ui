import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';
import { BorderStyle, ColorType, RoundedType, SizeType } from '../../types/GlobalType';

type Variant = ColorType;
type BorderType = ColorType;
type textColor = ColorType;
type Size = SizeType;
type Rounded = RoundedType | 'full';

type BreadcrumbVariantsProps = {
    separator?: 'slash' | 'dot' | 'arrow';
    size?: Size;
    hover?: textColor;
    always?: textColor;
    active?: textColor;
    focus?: textColor;
    borderStyle?: BorderStyle;
    rounded?: Rounded;
    variant?: Variant;

};
type BreadcrumbItemProps = {
    children: React.ReactNode;
    href?: string;
    icon?: JSX.Element;
};


type BreadcrumbProps = BreadcrumbVariantsProps & {
    items: BreadcrumbItemProps[];
    className?: string;
    textColor?: textColor;
    variant?: Variant;
    border?: BorderType;


    /**
     * پیش‌فرض: <a> (برای React معمولی)
     * در پروژه‌هایی مانند Next.js می‌توان <Link> از next/link را ارسال کرد.
     */
    LinkComponent?: React.ComponentType<{ href: string; children: React.ReactNode; className?: string }>;
};

const BreadcrumbVariants = cva('flex items-center gap-2 px-2 py-1', {
    variants: {
        variant: {
            primary: 'bg-primary/20 ',
            secondary: 'bg-secondary/20  ',
            warning: 'bg-warning/20  ',
            danger: 'bg-error/20  ',
            inverse: 'bg-gray-600/20  ',
            success: 'bg-success/20  ',
            purple: 'bg-purple-500/20  ',
            default: 'bg-gray-500/20  ',
            white: 'bg-white/20  ',
        },
        border: {
            primary: 'border-2 border-primary  ',
            secondary: 'border-2 border-secondary  ',
            warning: 'border-2 border-warning  ',
            danger: 'border-2 border-error  ',
            inverse: 'border-2 border-gray-600  ',
            success: 'border-2 border-success  ',
            purple: 'border-2 border-purple-500  ',
            default: 'border-2 border-gray-500  ',
            white: 'border-2 border-white  ',
        },
        textcolor: {
            primary: 'text-primary',
            secondary: 'text-secondary',
            warning: 'text-warning',
            danger: 'text-error',
            inverse: 'text-gray-600',
            success: 'text-success',
            purple: 'text-purple-500',
            default: 'text-gray-500',
            white: 'text-white',
        },
        hover: {
            primary: 'hover:text-primary/40 hover:underline no-underline',
            secondary: 'hover:text-secondary/40 hover:underline no-underline',
            warning: 'hover:text-warning/40 hover:underline no-underline',
            danger: 'hover:text-error/40 hover:underline no-underline',
            inverse: 'hover:text-gray-600/40 hover:underline no-underline',
            success: 'hover:text-success/40 hover:underline no-underline',
            purple: 'hover:text-purple-500/40 hover:underline no-underline',
            default: 'hover:text-gray-500/40 hover:underline no-underline',
            white: 'hover:text-white/40 hover:underline no-underline',
        },
        always: {
            primary: 'text-primary underline',
            secondary: 'text-secondary underline',
            warning: 'text-warning underline',
            danger: 'text-error underline',
            inverse: 'text-gray-600 underline',
            success: 'text-success underline',
            purple: 'text-purple-500 underline',
            default: 'text-gray-500 underline',
            white: 'text-white underline',
        },
        active: {
            primary: 'active:text-primary/40 active:underline',
            secondary: 'active:text-secondary/40 active:underline',
            warning: 'active:text-warning/40 active:underline',
            danger: 'active:text-error/40 active:underline',
            inverse: 'active:text-gray-600/40 active:underline',
            success: 'active:text-success/40 active:underline',
            purple: 'active:text-purple-500/40 active:underline',
            default: 'active:text-gray-500/40 active:underline',
            white: 'active:text-white/40 active:underline',
        },
        focus: {
            primary: 'focus:text-primary/40',
            secondary: 'focus:text-secondary/40',
            warning: 'focus:text-warning/40',
            danger: 'focus:text-error/40',
            inverse: 'focus:text-gray-600/40',
            success: 'focus:text-success/40',
            purple: 'focus:text-purple-500/40',
            default: 'focus:text-gray-500/40',
            white: 'focus:text-white/40',
        },
        borderStyle: {
            solid: "border-solid",
            dashed: "border-dashed",
            dotted: "border-dotted",
            none: "border-none",
        },
        rounded: {
            sm: "rounded-[0.25rem]",
            md: "rounded-[0.625rem]",
            lg: "rounded-[1.125rem]",
            full: "rounded-[2.1875rem]",
        },
        separator: {
            slash: 'separator-slash',
            dot: 'separator-dot',
            arrow: 'separator-arrow',
        },
        size: {
            sm: 'text-[15px]',
            md: 'text-[20px]',
            lg: 'text-[30px]',
        },
    },
    defaultVariants: {
        separator: 'slash',
        size: 'md',
    },
});
/**
 *
 *
 * @export
 * @param {BreadcrumbProps} {
 *     items,
 *     separator,
 *     size,
 *     textColor,
 *     hover,
 *     always,
 *     active,
 *     focus,
 *     LinkComponent,
 *     border,
 *     rounded,
 *     
 * }
 * @return {*}  {JSX.Element}
 */


export default function Breadcrumb({
    items,
    separator,
    size,
    textColor,
    hover,
    always,
    active,
    focus,
    LinkComponent,
    borderStyle,
    rounded,
    variant,
    border,
}: BreadcrumbProps): JSX.Element {
    return (
        <ul className={cn(BreadcrumbVariants({ separator, size, borderStyle, rounded, variant, border }), "")}>
            {items.map((item, index) => (
                <li key={index} className="inline-flex items-center transition-all duration-300">
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.href ? (
                        LinkComponent ? (
                            <LinkComponent
                                href={item.href}
                                className={cn(
                                    BreadcrumbVariants({ textcolor: textColor, hover, always, active, focus }),
                                    'hover:transition-colors'
                                )}
                            >
                                {item.children}
                            </LinkComponent>
                        ) : (
                            <a
                                href={item.href}
                                className={cn(
                                    BreadcrumbVariants({ textcolor: textColor, hover, always, active, focus }),
                                    'hover:transition-colors'
                                )}
                            >
                                {item.children}
                            </a>
                        )
                    ) : (
                        <span className={cn(BreadcrumbVariants({}))}>{item.children}</span>
                    )}
                    {index < items.length - 1 && (
                        <span
                            className={cn(
                                BreadcrumbVariants({ textcolor: textColor }),
                                separator === 'dot' || separator === 'arrow' ? 'mx-2' : 'mx-2'
                            )}
                        >
                            {separator === 'dot' ? '·' : separator === 'arrow' ? '>' : '/'}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}
