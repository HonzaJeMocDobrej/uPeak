/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/TopMenu";
import "react-dropdown/style.css";
import basicProfilePic from "../assets/img/userPicBasic.svg";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import "../styles/styles.css";
import { checkIfImgExists } from "../functions/functions";
import { useEffect, useRef, useState } from "react";
import LoadingPage from "../components/LoadingPage";
import Files from "react-files";
import { deleteUser, patchImage, send2FA, updateUser } from "../models/user";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import ProfilePopup from "../components/ProfilePopup";
import exit from '../assets/icons/exit.svg'
import deleteAccount from '../assets/icons/deleteAccount.svg'

import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useNavigate } from "react-router-dom";
import InfoCircle from "../components/InfoCircle";
import AuthCode from "react-auth-code-input";

function Profile(props) {
  const {
    active,
    isEnglish,
    setIsEnglish,
    isBlack,
    setIsBlack,
    switchStyle,
    setSwitchStyle,
    setIsNotificationRead,
    isNotificationRead,
    setVerificationCode,
    verificationCode
  } = props;

  const auth = useAuthUser();
  const [imgSrc, setImgSrc] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUsernameOpen, setIsUsernameOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isDeleteAccOpen, setIsDeleteAccOpen] = useState('')
  const [isCodeOpen, setIsCodeOpen] = useState(false)
  const signIn = useSignIn();

  const [newInput, setNewInput] = useState("");
  const [typePassword, setTypePassword] = useState("");

  const signOut = useSignOut()
  let navigate = useNavigate()

  const [info, setInfo] = useState('')
  const [codeInput, setCodeInput] = useState('')

  const authInputRef = useRef(null)


  const load = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  };

  // const handleUpdate = () => {
  //   updateUser(auth.id, [
  //     {
  //       'propName':
  //     }
  //   ])
  // }

  const handlePatchImage = async (file) => {
    const data = new FormData();
    data.append("profilePic", file);

    const img = await patchImage(auth.email, data).catch((err) => {
      // console.log(err.response.data.msg);
    });

    if (img.status == 200) {
      setImgSrc(img.data.image);
      signIn({
        auth: {
          token: img.token,
          type: "Bearer",
        },
        userState: {
          id: img.data.id,
          email: img.data.email,
          username: img.data.username,
          profilePic: img.profilePic,
        },
      });
    }
  };

  const univHandler = (setter) => {
    setter((prev) => !prev);
  };

  const getImage = async (file) => {
    const fileObj = file[0];
    const img = URL.createObjectURL(fileObj);
    // console.log(img);
    handlePatchImage(fileObj);
  };

  const removeAcc = async () => {
    const deleteAcc = await deleteUser(auth.id)
    .catch(err => {
      // console.log(err.response.data.msg)
    })
    if (deleteAcc.status == 200) return navigate('/signup')
    
  }

  const sendCode = async () => {
    const sentCode = await send2FA({
      email: auth.email
    })
    .catch(err => {
      setInfo(err.response.data.msg)
    })
    
    setIsDeleteAccOpen(false)
    setIsCodeOpen(true)
    if (sentCode.status == 200) {
      setVerificationCode(sentCode.code)
    }
  }

  const submit = async () => {

    if (verificationCode != codeInput) {
      setInfo('Wrong code')
      setCodeInput('')
      authInputRef.current?.clear()
      return
    } 

      removeAcc()
      navigate(`/signup`)
      return
    }

    const disableClick = () => {
      if (isUsernameOpen || isEmailOpen || isPasswordOpen || isCodeOpen || isDeleteAccOpen) {
        setIsUsernameOpen(false);
        setIsEmailOpen(false);
        setIsPasswordOpen(false);
        setIsCodeOpen(false);
        setIsDeleteAccOpen(false)
        setNewInput("");
        setTypePassword('')
      }
    }

    const resendCode = async () => {
      const sentCode = await send2FA({
        email: auth.email
      })
      .catch(err => {
        setInfo(err.response.data.msg)
      })
  
      if (sentCode.status == 200) {
        setVerificationCode(sentCode.code)
      }
    }

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
          setIsNotificationRead={setIsNotificationRead}
          isNotificationRead={isNotificationRead}
        />
        <main className={`mainStuff ${isBlack ? "mainBlack" : null}`}>
          <div className="profileMenuCont">
          <InfoCircle
            isEmailOpen={isEmailOpen}
            isPasswordOpen={isPasswordOpen}
            isUsernameOpen={isUsernameOpen}
            isCodeOpen={isCodeOpen}
            isBlack={isBlack}
            isEnglish={isEnglish}
            textEn={'Profile is really straightforward. You basically manage all your user information here including a profile picture. You can also log out and delete your account.'}
            textCz={'Stránka profil poměrně mluví sama za sebe. V podstatě zde upravujete veškeré své uživatelské informace, včetně změny obrázku. Můžete se zde také odhlásit, nebo smazat úcet.'}
          />
            <div
              onClick={disableClick}
              className={`profileCont ${
                isUsernameOpen || isEmailOpen || isPasswordOpen || isCodeOpen || isDeleteAccOpen
                  ? "profileContOpen"
                  : null
              }`}
            >
          
              <h2
                style={{
                  color: isBlack ? "#FFF" : "#333",
                }}
                className="profileHeadline"
              >
                {isEnglish ? 'My Profile' : 'Můj Profil'}
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
                <Files
                  className="uploadBtn"
                  accepts={["image/*"]}
                  maxFileSize={5000000}
                  minFileSize={0}
                  name="profilePic"
                  onChange={getImage}
                >
                  {isEnglish ? 'Your Image' : 'Změnit Obrázek'}
                </Files>
              </div>
              <h3
                style={{
                  color: isBlack ? "#FFF" : "#333",
                }}
              >
                {isEnglish ? 'Account Settings' : 'Nastavení Účtu'}
              </h3>
              <div className="border"></div>
              <div className="itemCont">
                <div className="headlineValueCont">
                  <p
                    style={{
                      color: isBlack ? "#FFF" : "#333",
                    }}
                  >
                    Username
                  </p>

                  <p
                    className="pValue"
                    style={{
                      color: isBlack ? "#CCC" : "#666",
                    }}
                  >
                    {auth.username}
                  </p>
                </div>
                <button
                  className={`changeBtn ${isBlack ? "changeBtnBlack" : ""}`}
                  style={{
                    color: isBlack ? "#CCC" : "#666",
                    borderColor: isBlack ? "#CCC" : "#666",
                  }}
                  onClick={() => univHandler(setIsUsernameOpen)}
                >
                  {isEnglish ? 'Change' : 'Změnit'} username
                </button>
              </div>

              <div className="itemCont">
                <div className="headlineValueCont">
                  <p
                    style={{
                      color: isBlack ? "#FFF" : "#333",
                    }}
                  >
                    Email
                  </p>
                  <p
                    className="pValue"
                    style={{
                      color: isBlack ? "#CCC" : "#666",
                    }}
                  >
                    {auth.email}
                  </p>
                </div>
                <button
                  className={`changeBtn ${isBlack ? "changeBtnBlack" : ""}`}
                  style={{
                    color: isBlack ? "#CCC" : "#666",
                    borderColor: isBlack ? "#CCC" : "#666",
                  }}
                  onClick={() => univHandler(setIsEmailOpen)}
                >
                  {isEnglish ? 'Change' : 'Změnit'} email
                </button>
              </div>
              {/* <input
              style={{
                color: isBlack ? "rgb(204, 204, 204)" : "#808080",
              }}
              maxLength={32}
              className="emailInput"
              placeholder="Your Email"
            ></input> */}
              <div className="itemCont">
                <div className="headlineValueCont">
                  <p
                    style={{
                      color: isBlack ? "#FFF" : "#333",
                    }}
                  >
                    {isEnglish ? 'Password' : 'Heslo'}
                  </p>
                  <div
                    className="pValue"
                    style={{
                      color: isBlack ? "#CCC" : "#666",
                    }}
                  >
                    ******
                  </div>
                </div>
                <button
                  className={`changeBtn ${isBlack ? "changeBtnBlack" : ""}`}
                  style={{
                    color: isBlack ? "#CCC" : "#666",
                    borderColor: isBlack ? "#CCC" : "#666",
                  }}
                  onClick={() => univHandler(setIsPasswordOpen)}
                >
                  {isEnglish ? 'Change password' : 'Změnit heslo'}
                </button>
              </div>
              <div onClick={() => {
                signOut()
                navigate('/signin')
              }} className="logoutBtn" style={{
                pointerEvents: isEmailOpen || isPasswordOpen || isUsernameOpen || isCodeOpen || isDeleteAccOpen ? 'none' : null
              }}>
                <img src={exit} alt="" />
                <p className="logoutP">{isEnglish ? 'Sign out' : 'Odhlásit se'}</p>
            </div>
            <div className="border"></div>
            <div onClick={() => {
                setIsDeleteAccOpen(prev => !prev)
              }} className="logoutBtn" style={{
                pointerEvents: isEmailOpen || isPasswordOpen || isUsernameOpen || isCodeOpen || isDeleteAccOpen ? 'none' : null
              }}>
                <img src={deleteAccount} alt="" />
                <p className="logoutP">{isEnglish ? 'Delete Account' : 'Smazat Účet'}</p>
            </div>
            </div>
            <div style={{display: isDeleteAccOpen ? 'block' : 'none'}} className="profileDeletePopup">
              <h3>Delete Account?</h3>
              <div className="buttonCont">
                <button onClick={sendCode} className="buttonDelete">Delete</button>
                <button onClick={disableClick} className="buttonCancel">Cancel</button>
              </div>
            </div>
            <div className="profileValidate">
            <div style={{display: isCodeOpen ? 'block' : 'none'}} className="signUp">
                <h2>Enter your code</h2>
                <AuthCode ref={authInputRef} onChange={(res) => setCodeInput(res)} containerClassName='authCodeCont' allowedCharacters='numeric' />
                <div className="bottomCodeDivs">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <button onClick={submit}>Submit</button>
              <p className='profileAccountInfo'>Didn&apos;t get the code? <pre onClick={resendCode}> Resend it</pre></p>
                <p className="err" style={{
                  color: '#FF3D00'
                }}>
                  {info}
                </p>
            </div>
            </div>
            <ProfilePopup
              isBlack={isBlack}
              toggle={isUsernameOpen}
              setToggle={setIsUsernameOpen}
              change={"Username"}
              setNew={setNewInput}
              newInput={newInput}
              setTypePassword={setTypePassword}
              typePassword={typePassword}
              isEnglish={isEnglish}
            ></ProfilePopup>
            <ProfilePopup
              isBlack={isBlack}
              toggle={isEmailOpen}
              setToggle={setIsEmailOpen}
              change={"Email"}
              setNew={setNewInput}
              newInput={newInput}
              setTypePassword={setTypePassword}
              typePassword={typePassword}
              isEnglish={isEnglish}
            ></ProfilePopup>
            <ProfilePopup
              isBlack={isBlack}
              toggle={isPasswordOpen}
              setToggle={setIsPasswordOpen}
              change={"Password"}
              setNew={setNewInput}
              newInput={newInput}
              setTypePassword={setTypePassword}
              typePassword={typePassword}
              isEnglish={isEnglish}
            ></ProfilePopup>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;
