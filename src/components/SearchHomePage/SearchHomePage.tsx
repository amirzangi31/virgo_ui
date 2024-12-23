import React, { useState, useEffect } from "react";
// import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";
import { ColorType, SizeType } from "../../types/GlobalType";

type Variant = ColorType;
type Size = SizeType;

type SearchComponentProps = {
  placeholder?: string;
  buttonErrorText?: string;
  buttonDisabled?: boolean;
  variant?: Variant;
  size?: Size;
  results?: string[];
  children?: React.ReactNode;
};

const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder = "...",
  buttonErrorText = "",
  results: initialResults = [],
  children,
}) => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<string[]>(initialResults);

  const handleSearch = async () => {
    if (searchText.trim() !== "") {
      const data = initialResults.filter((item) =>
        item.toLowerCase().includes(searchText.toLowerCase())
      );
      setResults(data);
    } else {
      setResults(initialResults);
    }
  };

  useEffect(() => {
    if (searchText) {
      const delayDebounce = setTimeout(() => {
        handleSearch();
      }, 300);
      return () => clearTimeout(delayDebounce);
    } else {
      setResults(initialResults);
    }
  }, [searchText, initialResults]);

  return (
    <div
      className={cn(
        "h-[3.3125rem] bg-white max-w-[1088px] mx-auto rounded-[10rem] p-2 flex flex-col justify-center items-center relative"
      )}
    >
      <div className="w-full flex justify-between items-center">
        <input
          className="text-md placeholder:text-gray-300 flex-1 text-right h-full rounded-full px-4"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
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

      {results.length > 0 && (
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
      )}
    </div>
  );
};

export default SearchComponent;
