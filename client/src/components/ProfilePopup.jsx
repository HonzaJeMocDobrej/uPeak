/* eslint-disable react/prop-types */

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { updateUser, updateUserPassword } from "../models/user";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useEffect, useState } from "react";

function ProfilePopup(props) {
  const auth = useAuthUser();
  const signIn = useSignIn();
  const [msg, setMsg] = useState("");

  const {
    toggle,
    setToggle,
    isBlack,
    change,
    setNew,
    newInput,
    setTypePassword,
    typePassword,
  } = props;

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleClick = async () => {
    if (change == "Username") {
      let user = await updateUser(auth.id, [
        {
          propName: "username",
          value: newInput,
        },
        {
          propName: "password",
          value: typePassword,
        },
      ]).catch((err) => {
        // console.log(err.response.data.msg);
        setMsg(err.response.data.msg);
        setNew("");
        setTypePassword("");
      });

      if (user.status == 200) {
        setToggle(false);
        console.log(user.profilePic)
        signIn({
          auth: {
            token: user.token,
            type: "Bearer",
          },
          userState: {
            username: user.data.username,
            email: user.data.email,
            id: user.data.id,
            profilePic: user.data.profilePic
          },
        });
      }
    }

    if (change == "Email") {
      let user = await updateUser(auth.id, [
        {
          propName: "email",
          value: newInput,
        },
        {
          propName: "password",
          value: typePassword,
        },
      ]).catch((err) => {
        // console.log(err.response.data.msg);
        setMsg(err.response.data.msg);
        setNew("");
        setTypePassword("");
      });

      if (user.status == 200) {
        setToggle(false);
        signIn({
          auth: {
            token: user.token,
            type: "Bearer",
          },
          userState: {
            username: user.data.username,
            email: user.data.email,
            id: user.data.id,
            profilePic: user.data.profilePic
          },
        });
      }
    }

    if (change == "Password") {
      let user = await updateUserPassword(auth.id, {
        oldPass: typePassword,
        newPass: newInput,
      }).catch((err) => {
        // console.log(err.response.data.msg);
        setMsg(err.response.data.msg);
        setNew("");
        setTypePassword("");
      });

      if (user.status == 200) {
        setToggle(false);
        signIn({
          auth: {
            token: user.token,
            type: "Bearer",
          },
          userState: {
            username: user.data.username,
            email: user.data.email,
            id: user.data.id,
            profilePic: user.data.profilePic
          },
        });
      }
    }

    setNew("");
    setTypePassword("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 5000);

    //cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [msg]);

  return (
    <div
      style={{
        display: toggle ? "flex" : "none",
        backgroundColor: isBlack ? "#333" : null,
      }}
      className="popup"
    >
      <p
        style={{
          color: isBlack ? "#fff" : null,
        }}
      >
        New {change}
      </p>
      <input
        style={{
          color: isBlack ? "#F2F2F2" : "#808080",
        }}
        maxLength={20}
        className="userInput"
        placeholder={`New ${change}`}
        onChange={() => handleChange(event, setNew)}
        value={newInput}
        type={change == "Password" ? "password" : "text"}
      ></input>
      <p
        style={{
          color: isBlack ? "#fff" : null,
        }}
      >
        {change == "Password" ? "Old Password" : "Password"}
      </p>
      <input
        style={{
          color: isBlack ? "#F2F2F2" : "#808080",
        }}
        className="passInput"
        placeholder={change == "Password" ? "Old Password" : "Password"}
        onChange={() => handleChange(event, setTypePassword)}
        value={typePassword}
        type="password"
      ></input>

      <div onClick={handleClick} className="saveBtn">
        Save
      </div>
      <p
        style={{
          marginLeft: 0,
          marginRight: "2.4rem",
          textAlign: "center",
          color: "#FF3D00",
        }}
      >
        {msg}
      </p>
    </div>
  );
}

export default ProfilePopup;
