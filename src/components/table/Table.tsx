import React, { ReactNode, ReactElement, useState } from "react";
import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";

type Variant = "primary" | "secondary" | "warning" | "danger" | "success" | "default";
type Size = "sm" | "md" | "lg";
type Border = "solid" | "dashed" | "dotted" | "none";

type TableVariantsProps = {
  variant?: Variant;
  size?: Size;
  border?: Border;
};
type MinWidth = "sm" | "md" | "lg" | "custom";
type TableProps = TableVariantsProps & {
  className?: string;
  children: ReactNode;
  disabledColumns?: number[];
  enableRowSelect?: boolean;
  onRowSelect?: (selectedRows: number[]) => void; // Callback for selected rows
  columnWidths?: string[]; // Custom widths for columns
  minWidth?: MinWidth;// Added minWidth
};

const TableVariants = cva(
  " table-auto transition-all duration-300 border-collapse text-center",
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
      minWidth: {
        sm: "w-1/2", 
        md: "w-2/3", 
        lg: "w-5/6", 
      },
    },
    defaultVariants: {
      variant: "default",
      minWidth: "sm",
      size: "sm",
      border: "solid",
    },
  }
);

const Table = ({
  variant,
  size,
  border,
  className = "",
  children,
  disabledColumns = [],
  enableRowSelect = false,
  columnWidths = [],
  onRowSelect,
}: TableProps): JSX.Element => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Function to toggle row selection
  const toggleRowSelect = (rowIndex: number) => {
    const updatedSelectedRows = selectedRows.includes(rowIndex)
      ? selectedRows.filter((index) => index !== rowIndex)
      : [...selectedRows, rowIndex];
    setSelectedRows(updatedSelectedRows);
    if (onRowSelect) onRowSelect(updatedSelectedRows);
  };

  const isDisabledColumn = (index: number) => disabledColumns.includes(index);

  const validChildren = React.Children.toArray(children).filter((child) => React.isValidElement(child));

  return (
    <table className={cn(TableVariants({ variant, size, border}), className)}>
      {validChildren.map((child: ReactElement) => {
        if (child.type === "thead") {
          return React.cloneElement(child, {
            children: React.Children.map(child.props.children, (row: ReactElement) =>
              React.cloneElement(row, {
                className: "border-b border-gray-300",
                children: React.Children.map(row.props.children, (cell: ReactElement, index: number) => {
                  const isDisabled = isDisabledColumn(index);
                  const customWidth = columnWidths[index];
                  return React.cloneElement(cell, {
                    className: cn(cell.props.className, isDisabled ? "opacity-50" : ""),
                    style: { width: customWidth || "auto" },
                  });
                }),
              })
            ),
          });
        }

        if (child.type === "tbody") {
          return React.cloneElement(child, {
            children: React.Children.map(child.props.children, (row: ReactElement, rowIndex: number) => {
              if (row.type === "tr") {
                return React.cloneElement(row, {
                  className: cn(
                    row.props.className,
                    "border-b border-gray-300",
                    selectedRows.includes(rowIndex) ? "bg-gray-300" : ""
                  ),
                  children: [
                    enableRowSelect && (
                      <td key={`select-${rowIndex}`} className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(rowIndex)}
                          onChange={() => toggleRowSelect(rowIndex)}
                          aria-checked={selectedRows.includes(rowIndex)}
                        />
                      </td>
                    ),
                    ...React.Children.map(row.props.children, (cell: ReactElement, index: number) => {
                      const isDisabled = isDisabledColumn(index);
                      const customWidth = columnWidths[index];
                      return React.cloneElement(cell, {
                        className: cn(cell.props.className, isDisabled ? "cursor-not-allowed opacity-50" : ""),
                        style: { width: customWidth || "auto" },
                      });
                    }),
                  ],
                });
              }
              return row;
            }),
          });
        }

        return child;
      })}
    </table>
  );
};

export default Table;
