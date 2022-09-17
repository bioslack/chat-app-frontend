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
import useUser from "../../../hooks/useUser";
import "./styles.scss";
import Participants from "./Participants";
import User from "../../../models/User";

interface GroupDialogProps {
  onClose?: () => void;
  visible?: boolean;
}

const GroupDialog = function ({ onClose, visible }: GroupDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [pictureURL, setPictureURL] = useState(
    "http://localhost:8888/img/default.png"
  );
  const axios = useAxiosPrivate();
  const [file, setFile] = useState<File | null>();
  const { user, refresh } = useUser();
  const [name, setName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [participants, setParticipants] = useState<User[]>([]);
  const [userId] = useState(`${user?._id}`);

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
    setPictureURL("http://localhost:8888/img/default.png");
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
    setPictureURL("http://localhost:8888/img/default.png");
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose && onClose();
  }, [onClose]);

  // useEffect(() => {
  //   if (file && profilePictureRef.current) {
  //     profilePictureRef.current.src = URL.createObjectURL(file);
  //     // const formData = new FormData();
  //     // formData.append("picture", file);
  //     // axios
  //     //   .patch("chat", formData, {
  //     //     headers: {
  //     //       "Content-Type": "multipart/form-data",
  //     //     },
  //     //   })
  //     //   .then(() => refresh())
  //     //   .catch(() => console.log("Erro"));
  //   }
  // }, [file]);

  return (
    <div
      className={`overlay ${!visible ? "overlay--hidden" : "overlay--show"}`}
    >
      <div className="group-dialog">
        <span className="group-dialog__close" onClick={handleClose}>
          <MdClose size={25} color="#000" />
        </span>
        <img className="group-dialog__picture" src={pictureURL} alt="Profile" />
        <form className="group-dialog__picture-buttons">
          <a
            className="group-dialog__link"
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
            className="group-dialog__file"
            onChange={handleChangePicture}
          />
          <a
            className="group-dialog__link"
            href="#remover"
            onClick={handleRemovePicture}
          >
            <TbCameraMinus size={20} />
          </a>
        </form>
        <form onSubmit={handleFormEditName} className="group-dialog__field">
          <input
            ref={nameInputRef}
            value={name}
            className="group-dialog__input"
            onChange={(e) => setName(e.target.value)}
            onBlur={onBlur}
            disabled={!isEditingName}
            placeholder="Novo grupo"
          />
          <button
            className="group-dialog__btn-edit"
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
        <Button color="okay" title="Criar grupo" type="button" />
      </div>
    </div>
  );
};

export default GroupDialog;
