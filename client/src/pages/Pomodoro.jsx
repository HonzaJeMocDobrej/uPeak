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
import { useEffect, useRef, useState } from "react";

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

  const [time, setTime] = useState(1500)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const decrement = useRef(null)
  const [isPlayClicked, setIsPlayClicked] = useState(false)

  const playBtnClick = () => {
    if (!isPlayClicked) {
      decrement.current = setInterval(() => {
        setTime(prev => prev - 1)
      }, 1000)
      setIsPlayClicked(true)
      return
    }
  }

  const pauseBtnClick = () => {
    if (isPlayClicked) {
      clearInterval(decrement.current)
      setIsPlayClicked(false)
      return
    }
  }

  const stopBtnClick = () => {
    setTime(1500)
    clearInterval(decrement.current)
    setIsPlayClicked(false)
  }

  useEffect(() => {
    if (time <= 0) {
      clearInterval(decrement.current)
      setTime(0)
      return
    }
    formatter()
  }, [time])

  const formatter = () => {
    const minutesRaw = time/60
    const minutes = Math.floor(time/60)
    let seconds
    if (minutesRaw % 60 !== 0) {
      seconds = time - (minutes * 60) 
    }
    if (minutesRaw % 60 === 0) {
      seconds = 0
    }

    setMinutes(minutes)
    setSeconds(seconds)
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
          <div className="pomodoroCont">
            <h2>
              FO<span className="blueLetter">C</span>US
            </h2>
            <div className="timeCont">
              <img className="stars" src={stars_stage_one} alt="" />
              <h1 className="time">
                {minutes > 9 ? minutes : `0${minutes}`}:{seconds > 9 ? seconds : `0${seconds}`}
                </h1>
            </div>
            <div className="bottomBtnsCont">
              <div className="pauseBtnCont" onClick={pauseBtnClick}>
                <div className="pauseBtn">
                  <img src={pause} alt="" />
                </div>
                <div className="border"></div>
              </div>
              <div className="playBtnCont">
                <div className="playBtn" onClick={playBtnClick}>
                  <img src={play} alt="" />
                </div>
                <div className="border"></div>
              </div>
              <div className="stopBtnCont" onClick={stopBtnClick}>
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
