import { MdClose } from "react-icons/md";
import "./styles.scss";

interface MessageDialogProps {
  title: string;
  message: string;
  onClose: () => void;
}

const MessageDialog = function ({
  onClose,
  message,
  title,
}: MessageDialogProps) {
  return (
    <div className="login-dialog__overlay">
      <div className="login-dialog">
        <div className="login-dialog__close" onClick={onClose}>
          <MdClose size={25} color="black" />
        </div>
        <div className="login-dialog__title">{title}</div>
        <div className="login-dialog__message">{message}</div>
      </div>
    </div>
  );
};

export default MessageDialog;
