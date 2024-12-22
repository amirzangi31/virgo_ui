import React, { useState, useEffect } from "react";
import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";

/**
 * Button Variants
 */
const ButtonVariants = cva(
  "flex items-center justify-center rounded-[10rem] transition-all duration-200",
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
        sm: "px-4 py-1 text-sm",
        md: "px-6 py-2 text-md",
        lg: "px-8 py-3 text-lg",
      },
      isDisabled: {
        false: "",
        true: "bg-gray-300 text-gray-500 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface SearchComponentProps {
  placeholder?: string;
  buttonLabel?: string; 
  buttonErrorText?: string; 
  buttonDisabled?: boolean; 
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder = "", 
  buttonLabel = "",
  buttonErrorText = "",
  buttonDisabled = false,
}) => {
  const [searchText, setSearchText] = useState("");
  const [showSearchContent, setShowSearchContent] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  // Mock API search
  const mockSearchAPI = (query: string): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = [
          "دکتر احمدی",
          "دکتر کریمی",
          "دکتر محمدی",
          "متخصص قلب",
          "متخصص اطفال",
        ];
        resolve(
          mockData.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
          )
        );
      }, 500);
    });
  };

  const handleSearch = async () => {
    if (searchText.trim() !== "") {
      const data = await mockSearchAPI(searchText);
      setResults(data);
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    if (searchText) {
      const delayDebounce = setTimeout(() => {
        handleSearch();
      }, 300); 
      return () => clearTimeout(delayDebounce);
    } else {
      setResults([]);
    }
  }, [searchText]);

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
          onFocus={() => setShowSearchContent(true)}
        />
        <div className="flex flex-col items-center relative">
          <button
            className={cn(
              ButtonVariants({
                variant: "primary",
                size: "md",
                isDisabled: buttonDisabled,
              }),
              "relative"
            )}
            onClick={handleSearch}
            disabled={buttonDisabled}
          >
            {buttonLabel}
          </button>
          {buttonErrorText && (
            <p className="text-error absolute top-full right-0 ltr:left-0 text-sm px-4 mt-1">
              {buttonErrorText}
            </p>
          )}
        </div>
      </div>

      {showSearchContent && results.length > 0 && (
        <div className="absolute top-[4rem] left-0 w-full bg-white shadow-lg rounded-lg p-4 z-[20]">
          <ul>
            {results.map((result, index) => (
              <li
                key={index}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-right"
                onClick={() => {
                  setSearchText(result);
                  setShowSearchContent(false);
                }}
              >
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}

      <span
        className={cn("fixed w-0 h-0 block top-0 left-0 z-[15]", {
          "w-full h-screen": showSearchContent,
        })}
        onClick={() => setShowSearchContent(false)}
      ></span>
    </div>
  );
};

export default SearchComponent;
