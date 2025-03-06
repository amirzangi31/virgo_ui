import { useEffect, useRef, useState } from "react";
import { cva } from "class-variance-authority";
import cn from "../../utils/cnFun";
import { BorderStyle, RoundedType, SizeIOnputOtp } from "../../types/GlobalType";

type PartialInputProps = Pick<
  React.ComponentPropsWithoutRef<"input">,
  "className" | "style"
>;

type Props = {
  value: string;
  onChange(value: string): void;
  size?: number;
  validationPattern?: RegExp;
  sizeinput?: SizeIOnputOtp;
  errorMessage?: string;
  segmentStyle?: string[];
  gap?: string; 
} & PartialInputProps;

type OtpInputVariantsProps = {
  rounded?: RoundedType;
  borderStyle?: BorderStyle;
  variant?: "flat" | "bordered" | "underlined" | "faded";
};

const OtpInputVariants = cva(
  "text-center focus:outline-none transition-all duration-200",
  {
    variants: {
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      color: {
        primary: "border-primary bg-primary/40 ",
        secondary: "border-secondary bg-secondary/40",
        warning: "border-warning bg-warning/40",
        danger: "border-error bg-error/40",
        inverse: "border-gray-600 bg-gray-600/40",
        success: "border-success bg-success/40",
        purple: "border-purple-500 bg-purple-500/40",
        default: "border-gray-500 bg-gray-500/40",
        white: "border-white bg-white/40",
      },
      borderStyle: {
        solid: "border border-gray-300",
        dashed: "border-2 border-dashed border-gray-300",
        none: "border-none",
      },
      variant: {
        flat: "bg-transparent border-none",
        bordered: "border border-gray-300 bg-transparent",
        underlined: "border-b border-gray-300 bg-transparent",
        faded: "border border-gray-300 bg-gray-100/50",
      },
    },
    defaultVariants: {
   
    },
  }
);

const OtpInput = (props: Props & OtpInputVariantsProps) => {
  const {
    size = 5,
    validationPattern = /^[0-9]{1}$/,
    value,
    onChange,
    className,
    sizeinput = "md",
    rounded,
    borderStyle,
    variant, 
    segmentStyle = [
      "relative",
      "h-10",
      "w-10",
      "border-y",
      "border-r",
      "first:rounded-l-md",
      "first:border-l",
      "last:rounded-r-md",
      "border-default-200",
      "data-[active=true]:border",
      "data-[active=true]:z-20",
      "data-[active=true]:ring-2",
      "data-[active=true]:ring-offset-2",
      "data-[active=true]:ring-offset-background",
      "data-[active=true]:ring-foreground"],
    errorMessage,
    gap = "gap-2", 
    ...restProps
  } = props;

  const [error, setError] = useState(false);
  const arr = new Array(size).fill("-");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const elem = e.target;
    const val = e.target.value;
    if (!validationPattern.test(val) && val !== "") {
      setError(true);
      return;
    }

    setError(false);
    const valueArr = value.split("");
    valueArr[index] = val;
    const newVal = valueArr.join("").slice(0, size);
    onChange(newVal);

    if (val && index < size - 1) {
      const next = elem.nextElementSibling as HTMLInputElement | null;
      next?.focus();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const current = e.currentTarget;
    if (e.key === "ArrowLeft" || e.key === "Backspace") {
      const prev = current.previousElementSibling as HTMLInputElement | null;
      prev?.focus();
      prev?.setSelectionRange(0, 1);
      return;
    }

    if (e.key === "ArrowRight") {
      const next = current.nextSibling as HTMLInputElement | null;
      next?.focus();
      next?.setSelectionRange(0, 1);
      return;
    }

    if (e.key === "Enter") {
      setError(true); 
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const sizeClass =
    sizeinput === "lg"
      ? "w-12 h-12 text-lg"
      : sizeinput === "sm"
      ? "w-8 h-8 text-sm"
      : "w-10 h-10 text-base";

  return (
    <div>
      <div className={`flex flex-cols-${size} ${gap}`} dir="ltr">
        {arr.map((_, index) => (
          <input
            ref={index === 0 ? inputRef : null}
            key={index}
            {...restProps}
            className={cn(
              OtpInputVariants({
                rounded,
                borderStyle,
                variant,
              }),
              sizeClass,
              className,
              ...segmentStyle, 
              error ? "border-red-500 bg-red-300" : ""
            )}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern={validationPattern.source}
            maxLength={1}
            onKeyUp={handleKeyUp}
            onChange={(e) => handleInputChange(e, index)}
            value={value[index] ?? ""}
          />
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default OtpInput;
