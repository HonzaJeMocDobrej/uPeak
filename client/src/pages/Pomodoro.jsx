/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/topMenu";
import stars_stage_one from "../assets/icons/stars_stage_one.svg";
import stars_stage_two from "../assets/icons/stars_stage_two.svg";
import stars_stage_three from "../assets/icons/stars_stage_three.svg";
import stars_stage_four from "../assets/icons/stars_stage_four.svg";
import pause from "../assets/icons/pause.svg";
import play from "../assets/icons/play.svg";
import stop from "../assets/icons/stop.svg";

import "../styles/styles.css";

function Pomodoro(props) {
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
          <div className="pomodoroCont">
            <h2>
              FO<span className="blueLetter">C</span>US
            </h2>
            <div className="timeCont">
              <img className="stars" src={stars_stage_one} alt="" />
              <h1 className="time">25:00</h1>
            </div>
            <div className="bottomBtnsCont">
              <div className="pauseBtnCont">
                <div className="pauseBtn">
                  <img src={pause} alt="" />
                </div>
                <div className="border"></div>
              </div>
              <div className="playBtnCont">
                <div className="playBtn">
                  <img src={play} alt="" />
                </div>
                <div className="border"></div>
              </div>
              <div className="stopBtnCont">
                <div className="stopBtn">
                  <img src={stop} alt="" />
                </div>
                <div className="border"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Pomodoro;
