import { ReactNode } from "react"

export type SvgColorType = "primary" | "secondary" | "warning" | "danger" | "inverse" | "success" | "purple" | "default" | "white"
export type ColorType = "primary" | "secondary" | "warning" | "danger" | "inverse" | "success" | "purple" | "default" | "white"
export type RoundedType = "sm" | "md" | "lg" | "full"
export type SizeType = "sm" | "md" | "lg"
export type PositionType = "bottom-center" | "top-center" | "center" | "bottom-modal"
export type BorderStyle = "solid" | "dashed" | "none"
export type SizeIOnputOtp = "sm" | "md" | "lg"
export type FontWeightType = "light" | "normal" | "bold" | "fat"
type TableColumnUi<T> = {
      key: keyof T;
      label: string;
      sortable?: boolean;
      filterable?: boolean;
      width?: string;
      render?: (value: T[keyof T], row: T) => ReactNode;
}

export { TableColumnUi };