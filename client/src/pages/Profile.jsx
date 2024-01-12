/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/topMenu";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import dropdown from '../assets/icons/dropdownFill.svg'
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
  const options = [
    { value: "one", label: "One" },
    { value: "two", label: "Two", className: "myOptionClassName" },
    {
      type: "group",
      name: "group1",
      items: [
        { value: "three", label: "Three", className: "myOptionClassName" },
        { value: "four", label: "Four" },
      ],
    },
    {
      type: "group",
      name: "group2",
      items: [
        { value: "five", label: "Five" },
        { value: "six", label: "Six" },
      ],
    },
  ];

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
            <input className="userInput" placeholder="Your Username"></input>
            <p>Password</p>
            <input className="passInput" placeholder="Your Password"></input>
            <p>Location</p>
            <Dropdown
              options={options}
              onChange={null}
              placeholder="Country"
              placeholderClassName="dropdownPlaceholder"
              className="dropdownRoot"
              controlClassName="dropdownShown"
              menuClassName="dropdownMenu"
              // arrowClassName='arrow'
              arrowClosed={<img src={dropdown} className="arrow" />}
              arrowOpen={<img src={dropdown} className="arrow rotate" />}
            />
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
