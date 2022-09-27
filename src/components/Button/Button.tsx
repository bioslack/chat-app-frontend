import { CSSProperties } from "react";

interface TextInputProps {
  type: "button" | "submit" | "reset";
  title: string;
  onClick?: () => void;
  style?: CSSProperties;
  color?: "okay" | "danger";
}

const Button = function (props: TextInputProps) {
  const color =
    props.color === "okay"
      ? "#5DB075"
      : props.color === "danger"
      ? "#b05d5d"
      : "";

  return (
    <button
      {...props}
      style={{ ...props.style, backgroundColor: color }}
      className="button"
    >
      {props.title}
    </button>
  );
};

export default Button;
