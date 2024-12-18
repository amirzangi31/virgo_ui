import { useEffect, useRef } from "react";
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
} & PartialInputProps;

type OtpInputVariantsProps = {
  rounded?: RoundedType
  borderStyle?: BorderStyle;
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
      borderStyle: {
        solid: "border border-gray-300",
        dashed: "border-2 border-dashed border-gray-300",
        none: "border-none",
      },
    },
    defaultVariants: {
      rounded: "md",
      borderStyle: "solid",
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
    ...restProps
  } = props;

  const arr = new Array(size).fill("-");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const elem = e.target;
    const val = e.target.value;
    if (!validationPattern.test(val) && val !== "") return;

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
    <div className={`flex flex-cols-${size} gap-2`} dir="ltr">
      {arr.map((_, index) => {
        return (
          <input
            ref={index === 0 ? inputRef : null}
            key={index}
            {...restProps}
            className={cn(
              OtpInputVariants({
                rounded,
                borderStyle,
              }),
              sizeClass,
              className
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
        );
      })}
    </div>
  );
};

export default OtpInput;