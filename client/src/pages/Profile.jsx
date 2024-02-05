/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/TopMenu";
import 'react-dropdown/style.css';
import basicProfilePic from '../assets/img/userPicBasic.svg'

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import "../styles/styles.css";

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

  const auth = useAuthUser()

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
            <h2 className="profileHeadline">
              My Profile
            </h2>
            <div className="profileInfoCont">
              <img src={auth.profilePic ? `http://localhost:3000/${auth.profilePic}` : basicProfilePic} alt="" />
              <p>
                    {isEnglish ? 'Hello' : 'Ahoj'} 
                    <br /><span>{auth.username}</span>
                </p>
                <div className="uploadBtn">
                  Upload a Picture
                </div>
            </div>
            <p>Username</p>
            <input maxLength={20} className="userInput" placeholder="Your Username"></input>
            <p>Email</p>
            <input maxLength={32} className="emailInput" placeholder="Your Email"></input>
            <p>Password</p>
            <input className="passInput" placeholder="Your Password"></input>
            
            <div className="saveBtn">
              Save
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;
