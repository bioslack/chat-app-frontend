import {
  useState,
  useRef,
  useEffect,
  useCallback,
  FormEvent,
  MouseEvent,
} from "react";
import { MdClose, MdEdit, MdCheck } from "react-icons/md";
import { debounce } from "lodash";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Button from "../../../components/Button";
import useUser from "../../../hooks/useUser";
import "./styles.scss";
import Participants from "./Participants";

interface GroupDialogProps {
  onClose?: () => void;
  visible?: boolean;
}

const GroupDialog = function ({ onClose, visible }: GroupDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const axios = useAxiosPrivate();
  const [file, setFile] = useState<File | null>();
  const { user, refresh, getUsers } = useUser();
  const [name, setName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [userId] = useState(`${user?._id}`);

  const handleAlterPicture = (event: MouseEvent) => {
    event.preventDefault();
    fileInputRef.current?.click();
  };

  const handleRemovePicture = (event: MouseEvent) => {
    event.preventDefault();
    axios
      .delete("chat/picture")
      .then(() => refresh())
      .catch(() => console.log("Erro"));
  };

  const handleFormEditName = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      axios
        .patch("chat", { name })
        .then(() => refresh())
        .catch((err) => console.log(err));
    },
    [name, axios, refresh]
  );

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

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("picture", file);
      axios
        .patch("chat", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => refresh())
        .catch(() => console.log("Erro"));
    }
  }, [file, userId, axios, refresh]);

  return (
    <div
      className={`overlay ${!visible ? "overlay--hidden" : "overlay--show"}`}
    >
      <div className="group-dialog">
        <span className="group-dialog__close" onClick={onClose}>
          <MdClose size={25} color="#000" />
        </span>
        <img
          className="group-dialog__picture"
          src={`http://localhost:8888/img/${user?.picture}`}
          alt="Profile"
        />
        <form>
          <a
            className="group-dialog__link"
            href="#alterar"
            onClick={handleAlterPicture}
          >
            alterar
          </a>
          <input
            ref={fileInputRef}
            name="picture"
            type="file"
            accept="image/*"
            className="group-dialog__file"
            // @ts-ignore
            onChange={(event) => setFile(event.target.files[0])}
          />
          <input type="hidden" name="userId" value={userId} />
          &nbsp; &nbsp;
          <a
            className="group-dialog__link"
            href="#remover"
            onClick={handleRemovePicture}
          >
            remover
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
        <Participants />
        <Button color="okay" title="Criar grupo" type="button" />
      </div>
    </div>
  );
};

export default GroupDialog;
