import { CSSProperties, ReactNode } from "react";
import "./styles.scss";

interface FlexboxType {
  direction?: "column" | "row";
  children?: ReactNode | ReactNode[];
  style?: CSSProperties;
  className?: string;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  alignItems?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
}

const Flexbox = function (props: FlexboxType) {
  return (
    <div
      {...props}
      className={`flexbox flexbox--${
        props.direction && props.direction === "column" ? "column" : "row"
      } ${props.className}`}
      style={{
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
        ...props.style,
      }}
    />
  );
};

export default Flexbox;
