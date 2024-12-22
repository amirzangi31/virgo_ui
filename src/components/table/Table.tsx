import React, { ReactNode, useState } from "react";
import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";
import { BorderStyle, ColorType, SizeType } from "../../types/GlobalType";


type Variant = ColorType
type textColor = ColorType
type Size = SizeType
type MinWidth = SizeType | "full"


type TableVariantsProps = {
  variant?: Variant;
  size?: Size;
  border?: BorderStyle;
  textColor?: textColor
};

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
  nextButton?: ReactNode
  prevButton?: ReactNode
  tableClassname?: string
};

/**
 * Class Variants
 */
const TableVariants = cva(
  "table-auto transition-all duration-300 text-center  rounded-full w-full  overflow-hidden overflow-x-auto border border-primary",
  {
    variants: {

      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
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
        full: "w-full"
      },
    },
    defaultVariants: {
      rounded: "lg",
      minWidth: "full",
      size: "lg",
      border: "solid"
    },
  }
);


const TableColorVariants = cva(
  "",
  {
    variants: {
      variant: {
        primary: "bg-primary  text-primary",
        secondary: "bg-secondary  text-secondary",
        warning: "bg-warning  text-warning",
        danger: "bg-error  text-error",
        success: "bg-success  text-success",
        inverse: "bg-gray-600 text-gray-600",
        purple: "bg-purple-500 text-purple-500",
        default: "bg-gray-500  text-gray-500",
        white: "bg-white text-primary  ",
      },
    },
    defaultVariants: {
      variant: "primary"
    }
  }
)

const TableTextColorVariants = cva(
  "",
  {
    variants: {
      textColor: {
        primary: "text-primary",
        secondary: "text-secondary",
        warning: "text-warning",
        danger: "text-error",
        success: "text-success",
        inverse: "text-inverse-600",
        purple: "text-purple-500",
        default: "text-gray-500",
        white: "text-white",
      },
    },
    defaultVariants: {
      textColor: "primary"
    }
  }
)



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
  nextButton,
  prevButton,
  onRowSelect,
  tableClassname,
  textColor
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
    <div className={cn(
      "",
      TableVariants({
        size,
        border,
        minWidth
      }),
      className

    )}>
      <table
        className={`${tableClassname} px-4 w-full`}
      >
        <thead>
          <tr className="rounded-xl">
            {enableRowSelect && <th className={cn(
              "min-w-[4rem] ",
              TableColorVariants({
                variant
              })
            )}></th>}
            {columns.map((column, index) => (
              <th
                key={String(column.key)}
                className={cn("px-4 py-2 cursor-pointer ",
                  TableColorVariants({
                    variant
                  }),
                  "text-white",
                  disabledColumns.includes(index) && "opacity-50")}
                style={{ width: column.width || "auto" }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                {column.label}
                {sortConfig?.key === column.key && (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn(
          TableTextColorVariants({ textColor })
        )}>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-100 hover:text-black transition duration-200 ease-in-out ">
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

        <div className={cn(
          "mt-4  flex justify-center items-center gap-4 py-1",
          TableColorVariants({
            variant
          })
        )}>
          {
            prevButton ? prevButton : (
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-gray-200 border border-gray-300 rounded"
              >
                قبلی
              </button>
            )

          }
          <span className="text-center text-nowrap text-white ">
            {currentPage} از {totalPages}
          </span>
          {
            nextButton ? nextButton : (
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 bg-gray-200 border border-gray-300 rounded"
              >
                بعدی
              </button>
            )
          }
        </div>
      )}
    </div>
  );
};

export default Table;
