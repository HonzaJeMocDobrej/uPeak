/* eslint-disable react/prop-types */
import React, { useState } from "react";

function InfoCircle(props) {
  const [isInfoOpened, setIsInfoOpened] = useState(false);

  const onClicked = () => {
    setIsInfoOpened((prev) => !prev);
  };

  return (
    <>
      <div
        className={`outerCont ${
          props.isEmailOpen || props.isPasswordOpen || props.isUsernameOpen
            ? "outerContOpen"
            : ""
        }`}
      >
        <div
          style={{
            pointerEvents:
              props.isEmailOpen || props.isPasswordOpen || props.isUsernameOpen
                ? "none"
                : null,
          }}
          onClick={onClicked}
          className="infoCircle"
        >
          <p style={{ color: props.isBlack ? "#333" : "#FFF" }}>?</p>
        </div>
        <div
          style={{ display: isInfoOpened ? "block" : "none" }}
          className={`infoPopup ${props.pageClass}`}
        >
          <p style={{ color: props.isBlack ? "#333" : "#FFF" }}>
            {props.text}
          </p>
        </div>
      </div>
    </>
  );
}

export default InfoCircle;
