import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';

import { ColorType, RoundedType, SizeType } from '../../types/GlobalType';

type Variant = ColorType;
type Size = SizeType;

type ButtonVariantsProps = {
    variant?: Variant;
    rounded?: RoundedType;
    size?: Size;
    activeVariant?: Variant;
};

type PaginationProps = ButtonVariantsProps & {
    pageCount: number;
    variant: Variant;
    size: Size;
    rounded?: RoundedType;
    currentPage: number;
    onPageChange: (page: number) => void;
    className?: string;
    nextLabel?: React.ReactNode;
    previousLabel?: React.ReactNode;
    breakLabel?: React.ReactNode;
    pageRangeDisplayed?: number;
    marginPagesDisplayed?: number;
    activeClassName?: string;
    disabledClassName?: string;
    renderOnZeroPageCount?: (() => React.ReactNode) | null;
};

type ButtonVariantsFunction = (props: ButtonVariantsProps) => string;

const buttonStyles: ButtonVariantsFunction = cva(
    'transition-all duration-300 text-sm gap-2 rounded cursor-pointer flex justify-center items-center',
    {
        variants: {
            variant: {
                primary: 'bg-primary text-white border-2 border-white',
                secondary: 'bg-secondary text-white border-2 border-white',
                warning: 'bg-warning text-white border-2 border-white',
                danger: 'bg-error text-white border-2 border-white',
                success: 'bg-success text-white border-2 border-white',
                inverse: 'bg-gray-600 text-white border-2 border-white',
                purple: 'bg-purple-500 text-white border-2 border-white',
                default: 'bg-gray-500 text-white border-2 border-white',
                white: 'bg-white text-primary border-2 border-primary',
            },
            activeVariant: {
                primary: 'bg-white text-primary ',
                secondary: 'bg-white text-secondary ',
                warning: 'bg-white text-warning ',
                danger: 'bg-white text-error ',
                success: 'bg-white text-success ',
                inverse: 'bg-white text-gray-600 ',
                purple: 'bg-white text-purple-500 ',
                default: 'bg-white text-gray-500 ',
                white: 'bg-primary text-white ',
            },
            rounded: {
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                full: 'rounded-full',
            },
            size: {
                sm: 'w-[2rem] h-[2rem]',
                md: 'w-[2.5rem] h-[2.5rem]',
                lg: 'w-[3rem] h-[3rem]',
            },
        },
        defaultVariants: {
            rounded: 'full',
            size: 'sm',
        },
    }
);

export default function CustomPagination({
    pageCount,
    currentPage,
    onPageChange,
    className,
    nextLabel,
    previousLabel,
    breakLabel = '...',
    pageRangeDisplayed = 3,
    marginPagesDisplayed = 1,
    disabledClassName = 'opacity-20',
    renderOnZeroPageCount = null,
    variant,
    activeVariant,
}: PaginationProps): JSX.Element {
    if (pageCount === 0 && renderOnZeroPageCount) {
        return <>{renderOnZeroPageCount()}</>;
    }

    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = currentPage === pageCount;

    const generateButtonsInRange = (start: number, end: number) => {
        const buttons = [];
        for (let i = start; i <= end; i++) {
            const isActive = i === currentPage;
            const buttonVariant = isActive && activeVariant
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={cn(
                        buttonStyles(buttonVariant ? { activeVariant } : { variant })
                    )}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    const generatePageButtons = () => {
        const pages: React.ReactNode[] = [];
        if (pageCount === 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageClick(1)}
                    className={cn(buttonStyles({ variant, activeVariant }))}
                >
                    1
                </button>
            );
            return pages;
        }
        // دکمه‌های شروع
        pages.push(...generateButtonsInRange(1, Math.min(marginPagesDisplayed, pageCount)));

        // نمایش Break Label اگر فاصله بین صفحات زیاد باشد
        if (currentPage > marginPagesDisplayed + pageRangeDisplayed) {
            pages.push(<span key="break-start" className={disabledClassName}>{breakLabel}</span>);
        }

        // محاسبه بازه میانی
        const startPage = Math.max(
            marginPagesDisplayed + 1,
            currentPage - Math.floor(pageRangeDisplayed / 2)
        );
        const endPage = Math.min(
            pageCount - marginPagesDisplayed,
            currentPage + Math.floor(pageRangeDisplayed / 2)
        );

        pages.push(...generateButtonsInRange(startPage, endPage));

        // نمایش Break Label اگر فاصله بین صفحات زیاد باشد
        if (currentPage < pageCount - pageRangeDisplayed - marginPagesDisplayed) {
            pages.push(<span key="break-end" className={disabledClassName}>{breakLabel}</span>);
        }

        // دکمه‌های انتها
        pages.push(
            ...generateButtonsInRange(
                Math.max(pageCount - marginPagesDisplayed + 1, endPage + 1), // اصلاح این خط
                pageCount
            )
        );

        return pages;
    };


    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <button
                className={cn(
                    'transform transition-transform duration-300',
                    isPrevDisabled ? disabledClassName : ''
                )}
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={isPrevDisabled}
            >
                {previousLabel}
            </button>
            {generatePageButtons()}
            <button
                className={cn(
                    'transform transition-transform duration-300 rotate-180',
                    isNextDisabled ? disabledClassName : ''
                )}
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={isNextDisabled}
            >
                {nextLabel}
            </button>
        </div>
    );
}
