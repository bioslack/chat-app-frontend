import React from "react";
import { MdClose, MdEdit } from "react-icons/md";
import Flexbox from "../Flexbox";

import "./styles.scss";

interface DialogType {
  visible?: boolean;
  onDismis?: () => void;
}

const Dialog = function (props: DialogType) {
  return (
    <Flexbox
      className={`dialog__overlay ${props.visible ? "dialog--show" : ""}`}
    >
      <Flexbox className="dialog__container">
        <span className="dialog__close" onClick={props.onDismis}>
          <MdClose color="#000" size={22} />
        </span>
        <Flexbox direction="column">
          <div className="dialog__profile-picture"></div>
          <Flexbox style={{ marginLeft: 25 }}>
            <div>
              <input
                className="dialog__profile-name"
                disabled
                value="Luis Pereira"
              />
              <span>
                <MdEdit />
              </span>
            </div>
            <div>
              <input
                className="dialog__profile-status"
                disabled
                value="HR Manager"
              />
              <span>
                <MdEdit />
              </span>
            </div>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};

export default Dialog;
