import React, { useState, useEffect } from "react";
// import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";
import { ColorType, RoundedType, SizeType } from "../../types/GlobalType";
import { cva } from "class-variance-authority";

type Variant = ColorType;
type Size = SizeType;


type SearchVariantsProps = {
  variant?: Variant;
  size?: Size;
  rounded?: RoundedType
};

type SearchComponentProps = SearchVariantsProps & {
  placeholder?: string;
  buttonErrorText?: string;
  buttonDisabled?: boolean;
  results?: string[];
  children?: React.ReactNode;
  value: string,
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputClassname?: string
  className?: string
};

const SearchVariants: SearchVariantsFunction = cva(
  " bg-white max-w-[1088px] mx-auto rounded-[10rem] p-2 flex flex-col justify-center items-center relative",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        warning: "bg-warning",
        danger: "bg-danger",
        inverse: "bg-gray-600",
        success: "bg-success",
        purple: "bg-purple-500",
        default: "bg-gray-500",
        white: "bg-white",
      },
      size: {
        sm: "h-[3.3125rem]",
        md: "h-[4.3125rem]",
        lg: "h-[5.3125rem]",
      }
    },
    defaultVariants: {
      size: "sm",
      variant: "white"
    },
  }
);
type SearchVariantsFunction = (props: SearchVariantsProps) => string;







const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder = "...",
  buttonErrorText = "",
  results: initialResults = [],
  children,
  rounded,
  size,
  variant,
  changeHandler,
  value,
  inputClassname,
  className
}) => {
  // const [searchText, setSearchText] = useState("");
  // const [results, setResults] = useState<string[]>(initialResults);

  // const handleSearch = async () => {
  //   if (searchText.trim() !== "") {
  //     const data = initialResults.filter((item) =>
  //       item.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //     setResults(data);
  //   } else {
  //     setResults(initialResults);
  //   }
  // };

  // useEffect(() => {
  //   if (searchText) {
  //     const delayDebounce = setTimeout(() => {
  //       handleSearch();
  //     }, 300);
  //     return () => clearTimeout(delayDebounce);
  //   } else {
  //     setResults(initialResults);
  //   }
  // }, [searchText, initialResults]);

  return (
    <div
      className={cn(
        "",
        SearchVariants({
          rounded, size, variant
        }),
        className
      )}
    >
      <div className="w-full flex justify-between items-center">
        <input
          className={cn(
            "text-md placeholder:text-gray-300 flex-1 text-right h-full rounded-full px-4 bg-transparent ",
            inputClassname
          )}
          onChange={changeHandler}
          value={value}
          placeholder={placeholder}
        />
        <div className="flex flex-col items-center relative">
          {children}
          {buttonErrorText && (
            <p className="text-error absolute top-full right-0 text-sm px-4 mt-1">
              {buttonErrorText}
            </p>
          )}
        </div>
      </div>

      {/* {results.length > 0 && (
        <div className="transition-all duration-500 absolute top-[4rem] left-0 w-full bg-white shadow-lg rounded-lg p-4 z-[20] ">
          <ul>
            {results.map((result, index) => (
              <li
                key={index}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-right"
                onClick={() => setSearchText(result)}
              >
                {result}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default SearchComponent;
