import { ReactNode, Ref } from "react";
import { clsx } from "clsx";

export type StackProps = {
  children: ReactNode;
  gap?: number | string;
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end";
  className?: string;
  ref?: Ref<HTMLDivElement>;
};

export function Group({
  children,
  gap = "1rem",
  align = "center",
  justify = "center",
  className,
  ref,
}: StackProps) {
  return (
    <div
      ref={ref}
      className={clsx(className, "flex flex-row")}
      style={{
        gap: gap,
        alignItems: align,
        justifyContent: justify,
      }}
    >
      {children}
    </div>
  );
}
