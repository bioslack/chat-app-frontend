import {
  useState,
  useRef,
  useEffect,
  useCallback,
  FormEvent,
  MouseEvent,
  ChangeEventHandler,
} from "react";
import { MdClose, MdEdit, MdCheck } from "react-icons/md";
import { TbCameraPlus, TbCameraMinus } from "react-icons/tb";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Button from "../../../components/Button";
import Participants from "./Participants";
import User from "../../../models/User";
import { IMAGE_ROOT_SOURCE } from "../../../api/axios";

interface GroupDialogProps {
  onClose?: () => void;
  visible?: boolean;
}

const GroupDialog = function ({ onClose, visible }: GroupDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [pictureURL, setPictureURL] = useState(
    `${IMAGE_ROOT_SOURCE}/default.png`
  );
  const axios = useAxiosPrivate();
  const [file, setFile] = useState<File | null>();
  const [name, setName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [participants, setParticipants] = useState<User[]>([]);

  const handleClickAlterPictureBtn = (event: MouseEvent) => {
    event.preventDefault();
    fileInputRef.current?.click();
  };

  const handleChangePicture: ChangeEventHandler<HTMLInputElement> = (event) => {
    const input = event.target;
    if (input.files && input.files.length) {
      setFile(input.files[0]);
      setPictureURL(URL.createObjectURL(input.files[0]));
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemovePicture = (event: MouseEvent) => {
    event.preventDefault();
    setPictureURL(`${IMAGE_ROOT_SOURCE}/default.png`);
  };

  const handleFormEditName = useCallback((event: FormEvent) => {
    event.preventDefault();
  }, []);

  const toggleEditName = () => {
    setIsEditingName((prev) => {
      if (prev) {
        console.log("Done");
      } else {
        setTimeout(() => {
          nameInputRef.current?.focus();
          nameInputRef.current?.select();
        }, 10);
      }
      return !prev;
    });
  };

  const onBlur = () => {
    setTimeout(() => {
      setIsEditingName(false);
    }, 150);
  };

  const handleClose = useCallback(() => {
    setParticipants([]);
    setFile(undefined);

    setName("");
    setPictureURL(`${IMAGE_ROOT_SOURCE}/default.png`);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose && onClose();
  }, [onClose]);

  const handleSaveGroup = () => {
    const formData = new FormData();
    if (file) formData.append("picture", file);
    formData.append("members", JSON.stringify(participants.map((u) => u._id)));
    formData.append("name", name);

    axios
      .post("chat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => alert("success"))
      .catch(() => alert("Fail"))
      .finally(() => handleClose());
  };

  return (
    <div
      className={`dialog__overlay ${
        !visible ? "dialog__overlay--hidden" : "dialog__overlay--show"
      }`}
    >
      <div className="dialog">
        <span className="dialog__close" onClick={handleClose}>
          <MdClose size={25} color="#000" />
        </span>
        <img className="dialog__picture" src={pictureURL} alt="Profile" />
        <form className="dialog__picture-buttons">
          <a
            className="dialog__link"
            href="#alterar"
            onClick={handleClickAlterPictureBtn}
          >
            <TbCameraPlus size={20} />
          </a>
          <input
            ref={fileInputRef}
            name="picture"
            type="file"
            accept="image/*"
            className="dialog__file"
            onChange={handleChangePicture}
          />
          <a
            className="dialog__link"
            href="#remover"
            onClick={handleRemovePicture}
          >
            <TbCameraMinus size={20} />
          </a>
        </form>
        <form onSubmit={handleFormEditName} className="dialog__field">
          <input
            ref={nameInputRef}
            value={name}
            className="dialog__input"
            onChange={(e) => setName(e.target.value)}
            onBlur={onBlur}
            disabled={!isEditingName}
            placeholder="Novo grupo"
          />
          <button
            className="dialog__btn-edit"
            onClick={toggleEditName}
            style={{ opacity: isEditingName ? 1 : 0 }}
            type={!isEditingName ? "submit" : "button"}
          >
            {isEditingName ? (
              <MdCheck size={20} color="#000" />
            ) : (
              <MdEdit size={20} color="#000" />
            )}
          </button>
        </form>
        <Participants
          participants={participants}
          setParticipants={setParticipants}
        />
        <Button
          color="okay"
          title="Criar grupo"
          type="button"
          onClick={handleSaveGroup}
        />
      </div>
    </div>
  );
};

export default GroupDialog;
