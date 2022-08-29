import "./styles.scss";
import { CSSProperties } from "react";

interface HeadingType {
  type: "h1" | "h2" | "h3";
  weight?: "bold" | "normal";
  children?: string;
  style?: CSSProperties;
}

const Heading = function (props: HeadingType) {
  switch (props.type) {
    case "h1":
      return <h1 {...props}>{props.children}</h1>;
    case "h2":
      return <h2 {...props}>{props.children}</h2>;
    case "h3":
    default:
      return <h3 {...props}>{props.children}</h3>;
  }
};

export default Heading;
