import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cnFun';

import { ColorType, RoundedType } from '../../types/GlobalType';

type Variant = ColorType;

// type textColor = ColorType;
// type Size = SizeType;

type PaginationProps = {
    pageCount: number;
    variant: Variant
    rounded?: RoundedType
    currentPage: number; // صفحه فعلی
    onPageChange: (page: number) => void; // تابع تغییر صفحه
    className?: string; // کلاس‌های سفارشی
    nextLabel?: React.ReactNode; // آیکون یا متن دکمه بعدی
    previousLabel?: React.ReactNode; // آیکون یا متن دکمه قبلی
    breakLabel?: React.ReactNode; // متن جداکننده (مثل ...)
    pageRangeDisplayed?: number; // تعداد صفحات نمایش داده‌شده در وسط
    marginPagesDisplayed?: number; // تعداد صفحات در ابتدا و انتها
    activeClassName?: string; // کلاس فعال
    disabledClassName?: string; // کلاس غیرفعال
    renderOnZeroPageCount?: (() => React.ReactNode) | null; // رفتار برای حالت صفر صفحه
};

const buttonStyles = cva(
    'px-4 py-2 transition-all duration-300 text-sm  rounded cursor-pointer flex justify-center items-center',
    {
        variants: {
            variant: {
                primary: 'bg-primary text-white',
                secondary: 'bg-secondary text-white',
                warning: 'bg-warning text-white',
                danger: 'bg-error text-white',
                success: 'bg-success text-white',
                inverse: 'bg-gray-600 text-white',
                purple: 'bg-purple-500 text-white',
                default: 'bg-gray-500 text-white',
                white: 'bg-white text-primary',
                disabled: 'opacity-20 cursor-not-allowed',
            },
            rounded: {
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                full: "rounded-full",
            },
        },
        defaultVariants: {
            variant: 'primary',
            rounded: "full"
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

    const generatePageButtons = () => {
        const pages: React.ReactNode[] = [];

        for (let i = 1; i <= marginPagesDisplayed; i++) {
            if (i > pageCount) break;
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={cn(
                        buttonStyles({ variant: currentPage === i ? 'primary' : 'disabled' })
                    )}
                >
                    {i}
                </button>
            );
        }

        if (currentPage > marginPagesDisplayed + pageRangeDisplayed) {
            pages.push(
                <span key="break-start" className={disabledClassName}>
                    {breakLabel}
                </span>
            );
        }

        const start = Math.max(
            marginPagesDisplayed + 1,
            currentPage - Math.floor(pageRangeDisplayed / 2)
        );
        const end = Math.min(
            pageCount - marginPagesDisplayed,
            start + pageRangeDisplayed - 1
        );

        for (let i = start; i <= end; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={cn(
                        buttonStyles({ variant: currentPage === i ? 'primary' : 'disabled' })
                    )}
                >
                    {i}
                </button>
            );
        }

        if (currentPage < pageCount - pageRangeDisplayed - marginPagesDisplayed) {
            pages.push(
                <span key="break-end" className={disabledClassName}>
                    {breakLabel}
                </span>
            );
        }

        for (
            let i = Math.max(pageCount - marginPagesDisplayed + 1, end + 1);
            i <= pageCount;
            i++
        ) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={cn(
                        buttonStyles({ variant: currentPage === i ? 'primary' : 'disabled' })
                    )}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className={`flex items-center ${className}`}>
            <button
                className={`transform transition-transform duration-300 `}
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={isPrevDisabled}

            >
                {previousLabel}
            </button>
            {generatePageButtons()}
            <button
                className={`transform transition-transform duration-300 rotate-180  `}
                onClick={() => {
                    handlePageClick(currentPage + 1);
                }}
                disabled={isNextDisabled}
            >
                {nextLabel}
            </button>
        </div>
    );
}
