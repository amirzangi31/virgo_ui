import React, { ReactNode, useState } from "react";
import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";
import { BorderStyle, ColorType, SizeType } from "../../types/GlobalType";
import { Loader } from "../Loader";
import { Dropdown } from "../dropdown";


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
  pagination?: ReactNode;
  loading?: boolean;
  rowsPerPage?: number;
  nextButton?: ReactNode;
  prevButton?: ReactNode;
  tableClassname?: string;
  emptyText?: string;
  emptyClassname?: string;
  footer?: boolean;
  asyncSortableFun?: (direction: "asc" | "desc", key: keyof T) => Promise<void>;
  upSortIcon?: ReactNode;
  downSortIcon?: ReactNode;
  sortLoader?: ReactNode,
  refetch?: () => void
  refetchLoading?: boolean
  rowCount?: {
    count: number,
    handler: (value: number) => void,
    cotent: { name: string | number | boolean, value: string | number }[],
  }
};

/**
 * Class Variants
 */
const TableVariants = cva(
  "relative table-auto transition-all duration-300 text-center  rounded-full w-full  overflow-hidden overflow-x-auto border border-primary realtive",
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
  pagination,
  rowsPerPage = 10,
  onRowSelect,
  tableClassname,
  textColor,
  emptyClassname,
  emptyText,
  upSortIcon,
  downSortIcon,
  sortLoader,
  refetch,
  refetchLoading,
  asyncSortableFun,
  rowCount,
  loading
}: TableProps<T>): JSX.Element => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);
  const [sortLoading, setSortLoading] = useState(false)
  const toggleRowSelect = (rowIndex: number) => {
    const updatedSelectedRows = selectedRows.includes(rowIndex)
      ? selectedRows.filter((index) => index !== rowIndex)
      : [...selectedRows, rowIndex];
    setSelectedRows(updatedSelectedRows);
    if (onRowSelect) onRowSelect(updatedSelectedRows);
  };
  const handleSort = async (key: keyof T) => {
    if (asyncSortableFun) {
      setSortLoading(true);
      const newDirection = sortConfig?.direction === "asc" ? "desc" : "asc";
      try {
        setSortConfig({ key, direction: newDirection });
        await asyncSortableFun(newDirection, key);
      } finally {
        setSortLoading(false);
      }
      return;
    }
    if (!sortConfig || sortConfig.key !== key) {
      setSortConfig({ key, direction: "asc" });
    } else {
      setSortConfig({ key, direction: sortConfig.direction === "asc" ? "desc" : "asc" });
    }
  };

  const sortedData = React.useMemo(() => {
    if (asyncSortableFun) return data;
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
                <div className="flex justify-center items-center flex-row gap-1">
                  {column.label}
                  {sortLoading ? sortConfig?.key === column.key && <span className="scale-50">{sortLoader || <Loader size="sm" variant="white" />}</span> : sortConfig?.key === column.key && (sortConfig?.direction === "asc" ? upSortIcon ? upSortIcon :
                    <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 0L12.0622 6.75H-0.0621777L6 0Z" fill="white" />
                    </svg>


                    : downSortIcon ? downSortIcon : <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 7L-0.0621777 0.25H12.0622L6 7Z" fill="white" />
                    </svg>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn(
          TableTextColorVariants({ textColor })
        )}>
          {!loading && paginatedData.map((row, rowIndex) => (
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


          {loading && Array.from({ length: 7 }).map((_, index) => (
            <tr className="" key={`loading-${index}`}>
              {enableRowSelect && (
                <td className="border-b  transition duration-200 ease-in-out p-2">
                  <div className="  rounded-sm h-[2rem]   bg-gray-200 animate-pulse">

                  </div>
                </td>
              )}
              {
                columns.map((column, index) => (
                  <td key={`${String(column.key)}-${index}`} className="border-b  transition duration-200 ease-in-out p-2" >
                    <div className="  rounded-sm h-[2rem]   bg-gray-200 animate-pulse">

                    </div>
                  </td>
                ))
              }
            </tr>
          ))}
          {
            paginatedData.length === 0 && !loading && (
              <tr >
                <td colSpan={columns.length + 1} >
                  <div className={cn(
                    "flex justify-center items-center gap-2 min-h-[6.25rem] w-full text-sm",
                    TableTextColorVariants({ textColor }),
                    emptyClassname
                  )}>
                    {emptyText ? emptyText : "هیچ اطلاعاتی برای نمایش وجود ندارد"}
                  </div>
                </td>
              </tr>
            )
          }

          <tr >
            <td colSpan={columns.length + 1} className={cn(TableColorVariants({
              variant
            }))}>
              {pagination && (
                <div className={cn(
                  "flex  justify-center items-center gap-4 py-1 ",
                  {
                    "justify-between px-4": rowCount && pagination
                  },

                )}>
                  <div className="md:w-1/3 flex justify-start items-center">
                    {refetch && (
                      <button type="button" className={cn(
                        " ",
                        {
                          "animate-spin": refetchLoading
                        }

                      )} onClick={refetch}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.6953 -0.304688C15.1048 -0.304688 18.381 1.18103 20.6477 3.71436V0.457217C20.6477 0.133408 20.8953 -0.114211 21.2191 -0.114211C21.5429 -0.114211 21.7906 0.133408 21.7906 0.457217V5.21912C21.7906 5.54293 21.5429 5.79055 21.2191 5.79055H16.4572C16.1334 5.79055 15.8858 5.54293 15.8858 5.21912C15.8858 4.89531 16.1334 4.64769 16.4572 4.64769H19.962C17.8858 2.2096 14.9144 0.83817 11.6953 0.83817C5.71436 0.83817 0.838169 5.71436 0.838169 11.6953C0.838169 12.0191 0.59055 12.2667 0.266741 12.2667C-0.0570687 12.2667 -0.304688 12.0191 -0.304688 11.6953C-0.304688 5.08579 5.08579 -0.304688 11.6953 -0.304688ZM2.1715 17.6001H6.93341C7.25722 17.6001 7.50484 17.8477 7.50484 18.1715C7.50484 18.4953 7.25722 18.7429 6.93341 18.7429H3.44769C5.52388 21.181 8.47626 22.5525 11.6953 22.5525C17.6763 22.5525 22.5525 17.6763 22.5525 11.6953C22.5525 11.3715 22.8001 11.1239 23.1239 11.1239C23.4477 11.1239 23.6953 11.3715 23.6953 11.6953C23.6953 18.3048 18.3048 23.6953 11.6953 23.6953C8.28579 23.6953 5.0096 22.2096 2.74293 19.6763V22.9334C2.74293 23.2572 2.49531 23.5048 2.1715 23.5048C1.84769 23.5048 1.60007 23.2572 1.60007 22.9334V18.1715C1.60007 17.8477 1.84769 17.6001 2.1715 17.6001Z" fill="white" />
                        </svg>
                      </button>
                    )}</div>
                  {pagination ? <div className="md:w-1/3">{pagination}</div> : "test"}
                  {rowCount && <div className="md:w-1/3 flex justify-end items-center">
                    <Dropdown trigger={rowCount.count}
                      contentClassName="bottom-full"
                      triggerColor="white"
                      itemHandler={(value) => {
                        if (rowCount.handler) rowCount.handler(value.value)
                      }} colorItem='primary' position='left' content={rowCount.cotent || [{ value: 10, name: 10 },
                      { value: 20, name: 20 },
                      { value: 50, name: 50 },
                      ]} name='filter_button' /></div>}
                </div>
              )}</td>
          </tr>
        </tbody>

      </table>




    </div>
  );
};

export default Table;
