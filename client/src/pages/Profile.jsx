/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/TopMenu";
import "react-dropdown/style.css";
import basicProfilePic from "../assets/img/userPicBasic.svg";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import "../styles/styles.css";
import { checkIfImgExists } from "../functions/functions";
import { useEffect, useState } from "react";
import LoadingPage from "../components/LoadingPage";

function Profile(props) {
  const {
    active,
    isEnglish,
    setIsEnglish,
    isBlack,
    setIsBlack,
    switchStyle,
    setSwitchStyle,
  } = props;

  const auth = useAuthUser();
  const [imgSrc, setImgSrc] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const load = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  };

  useEffect(() => {
    checkIfImgExists(setImgSrc, auth.profilePic, basicProfilePic);
  }, [auth]);

  useEffect(() => {
    load();
  }, []);

  if (!isLoaded) {
    return (
      <>
        <LoadingPage />
      </>
    );
  }

  return (
    <>
      <div className={`menuCont ${isBlack ? "menuBlack" : null}`}>
        <LeftMenu
          active={active}
          isEnglish={isEnglish}
          setIsEnglish={setIsEnglish}
          isBlack={isBlack}
        />
        <TopMenu
          isEnglish={isEnglish}
          setIsEnglish={setIsEnglish}
          isBlack={isBlack}
          setIsBlack={setIsBlack}
          switchStyle={switchStyle}
          setSwitchStyle={setSwitchStyle}
        />
        <main className={`mainStuff ${isBlack ? "mainBlack" : null}`}>
          <div className="profileCont">
            <h2
              style={{
                color: isBlack ? "#FFF" : "#333",
              }}
              className="profileHeadline"
            >
              My Profile
            </h2>
            <div
              style={{
                backgroundColor: isBlack ? "#333" : "#FFF",
              }}
              className="profileInfoCont"
            >
              <img src={imgSrc} alt="" />
              <p
                style={{
                  color: isBlack ? "#FFF" : "#333",
                }}
              >
                {isEnglish ? "Hello" : "Ahoj"}
                <br />
                <span>{auth.username}</span>
              </p>
              <div className="uploadBtn">Upload a Picture</div>
            </div>
            <p
              style={{
                color: isBlack ? "#FFF" : "#333",
              }}
            >
              Username
            </p>
            <input
              style={{
                color: isBlack ? "rgb(204, 204, 204)" : "#808080",
              }}
              maxLength={20}
              className="userInput"
              placeholder="Your Username"
            ></input>
            <p
              style={{
                color: isBlack ? "#FFF" : "#333",
              }}
            >
              Email
            </p>
            <input
              style={{
                color: isBlack ? "rgb(204, 204, 204)" : "#808080",
              }}
              maxLength={32}
              className="emailInput"
              placeholder="Your Email"
            ></input>
            <p
              style={{
                color: isBlack ? "#FFF" : "#333",
              }}
            >
              Password
            </p>
            <input
              style={{
                color: isBlack ? "rgb(204, 204, 204)" : "#808080",
              }}
              className="passInput"
              placeholder="Your Password"
            ></input>

            <div className="saveBtn">Save</div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;
