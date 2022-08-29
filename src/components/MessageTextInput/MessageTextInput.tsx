import React, { CSSProperties, FormEvent } from "react";
import "./styles.scss";
import { MdSend } from "react-icons/md";

interface MessageTextInputType {
  sendMessage: (message: string) => void;
  style?: CSSProperties;
}

const MessageTextInput = function (props: MessageTextInputType) {
  const [message, setMessage] = React.useState("");
  const textInputRef = React.useRef<HTMLTextAreaElement>(null);

  const onSubmit = React.useCallback(
    function (event: FormEvent) {
      event.preventDefault();
      if (message) {
        props.sendMessage && props.sendMessage(message);
        setMessage("");
        textInputRef.current?.focus();
      }
      return;
    },
    [message, props]
  );

  return (
    <div className="message" style={props.style}>
      <form onSubmit={(event) => onSubmit(event)}>
        <textarea
          ref={textInputRef}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="message__textinput"
          placeholder="Type your message here"
        ></textarea>
        <button type="submit" className="message__button">
          <MdSend className="message__icon" />
        </button>
      </form>
    </div>
  );
};

export default MessageTextInput;
