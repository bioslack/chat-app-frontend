import "./styles.scss";
import React from "react";
import { IconType } from "react-icons";

import {
  MdOutlinePowerSettingsNew,
  MdOutlineSettings,
  MdAdd,
} from "react-icons/md";
import Dialog from "../Dialog";
import useAuth from "../../hooks/useAuth";

interface ProfileButtonType {
  Icon: IconType;
  onClick?: () => void;
}

const ProfileButton = function (props: ProfileButtonType) {
  return (
    <div className="display-profile__button" onClick={props.onClick}>
      <props.Icon color="#585858" size={20} />
    </div>
  );
};

const DisplayProfile = function () {
  const [showDialog, setShowDialog] = React.useState(false);
  const { logout, decoded } = useAuth();

  return (
    <>
      <div className="display-profile">
        <div className="display-profile__photo"></div>
        <div className="display-profile__right">
          <div className="display-profile__title">{decoded?.name}</div>
          <div style={{ color: "#7e7e7e" }}>
            <span className="display-profile__status" />
            &nbsp;online
          </div>
        </div>
        <div>
          <ProfileButton Icon={MdAdd} onClick={() => {}} />
          <ProfileButton
            Icon={MdOutlineSettings}
            onClick={() => {
              setShowDialog(true);
            }}
          />
          <ProfileButton
            Icon={MdOutlinePowerSettingsNew}
            onClick={() => logout()}
          />
        </div>
      </div>
      <Dialog visible={showDialog} onDismis={() => setShowDialog(false)} />
    </>
  );
};

export default DisplayProfile;
