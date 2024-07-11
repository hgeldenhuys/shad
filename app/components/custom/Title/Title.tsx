import { ReactNode } from "react";
import IntrinsicElements = React.JSX.IntrinsicElements;

const titles = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

const classes = {
  1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
  2: "border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  3: "text-2xl font-semibold tracking-tight",
  4: "text-xl font-semibold tracking-tight",
  5: "text-lg font-semibold tracking-tight",
  6: "text-base font-semibold tracking-tight",
};

export function Title({
  children,
  order = 1,
  className,
}: {
  children: ReactNode;
  order?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}) {
  const Tag = titles[order] as keyof IntrinsicElements;
  return (
    <Tag className={className ? className : classes[order]}>{children}</Tag>
  );
}
