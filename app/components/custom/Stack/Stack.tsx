import { ReactNode } from "react";
import { clsx } from "clsx";

export type StackProps = {
  children: ReactNode;
  gap?:
    | number
    | string
    | "0.5"
    | "1"
    | "1.5"
    | "2"
    | "3"
    | "4"
    | "xl"
    | "lg"
    | "md"
    | "sm"
    | "xs";
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end";
  padding?:
    | number
    | string
    | "0.5"
    | "1"
    | "1.5"
    | "2"
    | "3"
    | "4"
    | "xl"
    | "lg"
    | "md"
    | "sm"
    | "xs";
  className?: string;
};

//`flex flex-col gap-${typeof gap === "number" ? `${gap}px` : gap} items-${align} justify-${justify}`
export function Stack({
  children,
  gap = "2",
  align = "start",
  justify = "center",
  padding,
  className,
}: StackProps) {
  return (
    <div
      style={{
        padding: typeof padding === "number" ? `${padding}px` : padding,
      }}
      className={clsx(
        className,
        "",
        "flex flex-col",
        gap &&
          typeof gap === "string" &&
          [
            "0.5",
            "1",
            "1.5",
            "2",
            "3",
            "4",
            "xl",
            "lg",
            "md",
            "sm",
            "xs",
          ].includes(gap)
          ? `gap-${gap}`
          : `gap-[${typeof gap === "number" ? `${gap}px` : gap}]`,
        align && `items-${align}`,
        justify && `justify-${justify}`,
      )}
    >
      {children}
    </div>
  );
}
