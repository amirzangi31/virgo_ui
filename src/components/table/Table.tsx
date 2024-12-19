import React, { ReactNode, ReactElement } from 'react';
import { cva } from "class-variance-authority";
import cn from '../../utils/cnFun';

type variant = "primary" | "secondary" | "warning" | "danger" | "success" | "default";
type size = "sm" | "md" | "lg";
type border = "solid" | "dashed" | "dotted" | "none";

type TableVariantsProps = {
  variant?: variant;
  size?: size;
  border?: border;
};

type TableProps = TableVariantsProps & {
  className?: string;
  children: ReactNode;
  disabledColumns?: number[]; // New prop for disabling specific columns
};

type TableVariantsFunction = (props: TableVariantsProps) => string;

const TableVariants: TableVariantsFunction = cva(
  "min-w-full table-auto transition-all duration-300 border-collapse text-center", // Added `text-center` for horizontal centering
  {
    variants: {
      variant: {
        primary: "bg-primary text-white border border-primary",
        secondary: "bg-secondary text-white border border-secondary",
        warning: "bg-warning text-white border border-warning",
        danger: "bg-danger text-white border border-danger",
        success: "bg-success text-white border border-success",
        default: "bg-gray-500 text-white border border-gray-500",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      border: {
        solid: "border-solid",
        dashed: "border-dashed",
        dotted: "border-dotted",
        none: "border-none",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
      border: "solid",
    },
  }
);

// Define the Table component
const Table = ({
  variant,
  size,
  border,
  className = "",
  children,
  disabledColumns = [], // default to empty array if not provided
}: TableProps): JSX.Element => {

  // Function to determine if a column should be disabled based on the index
  const isDisabledColumn = (index: number) => disabledColumns.includes(index);

  // Ensure children is an array of React elements
  const validChildren = React.Children.toArray(children).filter(child => React.isValidElement(child));

  // Render table headers and cells with disabled state logic
  return (
    <table className={cn(TableVariants({ variant, size, border }), className)}>
      {validChildren.map((child: ReactElement) => {
        // Iterate over rows (the child rows of the table)
        if (child.type === 'thead' || child.type === 'tbody') {
          return React.cloneElement(child, {
            children: React.Children.map(child.props.children, (row: ReactElement) => {
              // Iterate over each row (e.g., <tr>) and its cells
              return React.cloneElement(row, {
                children: React.Children.map(row.props.children, (cell: ReactElement, index: number) => {
                  // Apply 'disabled' class to each cell in the disabled columns
                  const borderStyle = isDisabledColumn(index) 
                    ? "cursor-not-allowed opacity-50" 
                    : "border-b border-gray-300";  // Add borders to the bottom of each cell
                  
                  return React.cloneElement(cell, {
                    className: cn(cell.props.className, borderStyle),
                    disabled: isDisabledColumn(index) ? true : cell.props.disabled,
                  });
                }),
              });
            }),
          });
        }
        return child;
      })}
    </table>
  );
};

export default Table;
