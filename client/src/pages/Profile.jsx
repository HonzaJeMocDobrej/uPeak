/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/topMenu";
import 'react-dropdown/style.css';
import honzak from '../assets/img/honzak.png'

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
              <img src={honzak} alt="" />
              <p>
                    {isEnglish ? 'Hello' : 'Ahoj'} 
                    <br /><span>Honzak</span>
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
