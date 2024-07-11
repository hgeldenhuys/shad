import React, { ElementType, ReactNode } from "react";

interface BoxProps<Tag extends ElementType = "div"> {
  component?: Tag;
  children: ReactNode;
}

export function Box<Tag extends ElementType = "div">({
  component,
  children,
  ...rest
}: BoxProps<Tag> & Omit<React.ComponentPropsWithoutRef<Tag>, "component">) {
  const Component = component || "div";
  return <Component {...rest}>{children}</Component>;
}
