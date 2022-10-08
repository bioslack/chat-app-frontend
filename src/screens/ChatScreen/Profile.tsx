import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IMAGE_ROOT_SOURCE } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import User from "../../models/User";
import GroupDialog from "./GroupDialog";
import ProfileDialog from "./ProfileDialog";

interface ProfileProps {
  user?: User;
}

const Profile = ({ user }: ProfileProps) => {
  const { logout } = useAuth();
  const { refresh } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showGroupDialog, setShowGroupDialog] = useState(false);
  const navigate = useNavigate();

  const onChange = function () {
    setShowMenu((prev) => !prev);
  };

  const onBlur = function () {
    setTimeout(() => setShowMenu(false), 200);
  };

  const handleLogout = function () {
    logout().finally(() => {
      refresh().then(() => navigate("/login"));
    });
  };

  return (
    <div className="profile">
      <div className="profile__picture">
        <img src={`${IMAGE_ROOT_SOURCE}/${user?.picture}`} alt="profile" />
      </div>
      <div className="profile__name">{user?.name}</div>
      <div className="floating-menu__button">
        <input
          type="checkbox"
          onBlur={onBlur}
          onChange={onChange}
          checked={showMenu}
        />
        <BsThreeDotsVertical color="#fff" size={25} />
        <ul className="floating-menu">
          <li
            onClick={() => setShowGroupDialog(true)}
            className="floating-menu__item"
          >
            Criar grupo
          </li>
          <li
            className="floating-menu__item"
            onClick={() => setShowProfileDialog(true)}
          >
            Configurações
          </li>
          <li onClick={handleLogout} className="floating-menu__item">
            Logout
          </li>
        </ul>
      </div>
      <ProfileDialog
        visible={showProfileDialog}
        onClose={() => setShowProfileDialog(false)}
      />
      <GroupDialog
        visible={showGroupDialog}
        onClose={() => setShowGroupDialog(false)}
      />
    </div>
  );
};

export default Profile;
