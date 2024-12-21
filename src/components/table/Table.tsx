import React, { ReactNode, useState } from "react";
import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";

/**
 * Types
 */
type Variant = "primary" | "secondary" | "warning" | "danger" | "success" | "default";
type Size = "sm" | "md" | "lg";
type Border = "solid" | "dashed" | "dotted" | "none";

type TableVariantsProps = {
  variant?: Variant;
  size?: Size;
  border?: Border;
};
type MinWidth = "sm" | "md" | "lg" | "custom";

type TableColumn<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type TableProps<T> = TableVariantsProps & {
  className?: string;
  children?: ReactNode;
  data: T[];
  columns: TableColumn<T>[];
  disabledColumns?: number[];
  enableRowSelect?: boolean;
  onRowSelect?: (selectedRows: number[]) => void;
  columnWidths?: string[];
  minWidth?: MinWidth;
  pagination?: boolean;
  rowsPerPage?: number;
};

/**
 * Class Variants
 */
const TableVariants = cva(
  "table-auto transition-all duration-300 border-collapse text-center h-full",
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

/**
 * Main Table Component
 */
const Table = <T,>({
  variant,
  size,
  border,
  className = "",
  data,
  columns,
  minWidth,
  disabledColumns = [],
  enableRowSelect = false,
  pagination = false,
  rowsPerPage = 10,
  onRowSelect,
}: TableProps<T>): JSX.Element => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

  const toggleRowSelect = (rowIndex: number) => {
    const updatedSelectedRows = selectedRows.includes(rowIndex)
      ? selectedRows.filter((index) => index !== rowIndex)
      : [...selectedRows, rowIndex];
    setSelectedRows(updatedSelectedRows);
    if (onRowSelect) onRowSelect(updatedSelectedRows);
  };

  const handleSort = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) {
      setSortConfig({ key, direction: "asc" });
    } else {
      setSortConfig({ key, direction: sortConfig.direction === "asc" ? "desc" : "asc" });
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage, pagination]);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="overflow-x-auto max-w-full">
      <table
        className={cn(
          TableVariants({
            variant,
            size,
            border,
            minWidth: minWidth !== "custom" ? minWidth : undefined,
          }),
          className
        )}
      >
        <thead>
          <tr>
            {enableRowSelect && <th></th>}
            {columns.map((column, index) => (
              <th
                key={String(column.key)}
                className={cn("px-4 py-2 cursor-pointer", disabledColumns.includes(index) && "opacity-50")}
                style={{ width: column.width || "auto" }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                {column.label}
                {sortConfig?.key === column.key && (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {enableRowSelect && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => toggleRowSelect(rowIndex)}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-2">
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-200"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-gray-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
