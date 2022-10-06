import React, {
  FormEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdClose, MdEdit, MdCheck } from "react-icons/md";
import { IMAGE_ROOT_SOURCE } from "../../../api/axios";
import Button from "../../../components/Button";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useUser from "../../../hooks/useUser";

interface ProfileDialogProps {
  onClose?: () => void;
  visible?: boolean;
}

const ProfileDialog = function ({ onClose, visible }: ProfileDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const axios = useAxiosPrivate();
  const [file, setFile] = useState<File | null>();
  const { user, refresh, loading } = useUser();
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
    [name]
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

  React.useEffect(() => {
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
  }, [file, userId]);

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  return (
    <div
      className={`dialog__overlay ${
        !visible ? "dialog__overlay--hidden" : "dialog__overlay--show"
      }`}
    >
      <div className="dialog">
        <span className="dialog__close" onClick={onClose}>
          <MdClose size={25} color="#000" />
        </span>
        <img
          className="dialog__picture"
          src={`${IMAGE_ROOT_SOURCE}/${user?.picture}`}
        />
        <form>
          <a
            className="dialog__link"
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
            className="dialog__file"
            // @ts-ignore
            onChange={(event) => setFile(event.target.files[0])}
          />
          <input type="hidden" name="userId" value={userId} />
          &nbsp; &nbsp;
          <a
            className="dialog__link"
            href="#remover"
            onClick={handleRemovePicture}
          >
            remover
          </a>
        </form>
        {/* <Heading type="h1" style={{ marginTop: 10, marginBottom: 25 }}>
          {`${user?.name}`}
        </Heading> */}
        <form onSubmit={handleFormEditName} className="dialog__field">
          <input
            ref={nameInputRef}
            value={name}
            className="dialog__input"
            onChange={(e) => setName(e.target.value)}
            onBlur={onBlur}
            disabled={!isEditingName}
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
        <div className="dialog__spacer" />
        <Button color="danger" title="Excluir conta" type="button" />
      </div>
    </div>
  );
};

export default ProfileDialog;
