import classes from "./Image.module.css";
import { CSSProperties, Ref } from "react";

export interface ImageProps {
  ref?: Ref<any>;
  style?: CSSProperties;
  src?: string;
  className?: string;
  fallbackSrc?: string;
  alt?: string;
  height?: number | string;
  width?: number | string;
}

export function Image(props: ImageProps) {
  const { src, fallbackSrc, className, style, ref, alt, height, width } = props;
  return (
    <img
      height={height}
      width={width}
      ref={ref}
      src={src}
      className={className}
      style={style}
      alt={alt}
    />
  );
}

Image.classes = classes;
Image.displayName = "@mantine/core/Image";
