import { ChangeEventHandler, FocusEventHandler } from "react";

export type InputMessage = "okay" | "warn" | "danger";

interface TextInputType {
  type?: "text" | "password";
  placeholder?: string;
  className?: string;
  value?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
  message?: string;
  showMessages?: boolean;
  messageType?: InputMessage;
}

const TextInput = function (props: TextInputType) {
  const inputProps = {
    type: props.type,
    placeholder: props.placeholder,
    className: props.className,
    value: props.value,
    onChange: props.onChange,
    onBlur: props.onBlur,
    disabled: props.disabled,
  };
  return (
    <div className={`${props.className} text-input__container`}>
      <input {...inputProps} className="text-input" autoComplete="off" />
      {props.showMessages ? (
        <span
          className={`text-input__message text-input__message--${props.messageType}`}
        >
          {props.message}
        </span>
      ) : (
        <span className="text-input__message">&nbsp;</span>
      )}
    </div>
  );
};

export default TextInput;
