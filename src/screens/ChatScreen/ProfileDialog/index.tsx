import React from "react";
import { MdClose } from "react-icons/md";
import { axiosPrivate } from "../../../api/axios";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import useAuth from "../../../hooks/useAuth";
import "./styles.scss";

interface ProfileDialogProps {
  onClose?: () => void;
  visible?: boolean;
}

const ProfileDialog = function ({ onClose, visible }: ProfileDialogProps) {
  const { decoded } = useAuth();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>();
  const [userId] = React.useState(`${decoded?._id}`);

  const handleAlterPicture = (event: React.MouseEvent) => {
    event.preventDefault();
    fileInputRef.current?.click();
  };

  React.useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("userId", userId);
      axiosPrivate
        .post("upload/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => console.log("Foto atualizada"))
        .catch(() => console.log("Erro"));
    }
  }, [file, userId]);

  return (
    <div
      className={`overlay ${!visible ? "overlay--hidden" : "overlay--show"}`}
    >
      <div className="profile-dialog">
        <span className="profile-dialog__close" onClick={onClose}>
          <MdClose size={25} color="#000" />
        </span>
        <div className="profile-dialog__picture"></div>
        <form>
          <a
            className="profile-dialog__link"
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
            className="profile-dialog__file"
            // @ts-ignore
            onChange={(event) => setFile(event.target.files[0])}
          />
          <input type="hidden" name="userId" value={userId} />
          &nbsp; &nbsp;
          <a className="profile-dialog__link" href="#remover">
            remover
          </a>
        </form>
        <Heading type="h1" style={{ marginTop: 10, marginBottom: 25 }}>
          {`${decoded?.name}`}
        </Heading>
        <Button color="danger" title="Excluir conta" type="button" />
      </div>
    </div>
  );
};

export default ProfileDialog;
