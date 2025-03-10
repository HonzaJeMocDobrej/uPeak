/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/TopMenu";
import stars_stage_one from "../assets/icons/stars_stage_one.svg";
import stars_stage_two from "../assets/icons/stars_stage_two.svg";
import stars_stage_three from "../assets/icons/stars_stage_three.svg";
import stars_stage_four from "../assets/icons/stars_stage_four.svg";
import pause from "../assets/icons/pause.svg";
import play from "../assets/icons/play.svg";
import stop from "../assets/icons/stop.svg";
import pauseBlack from "../assets/icons/pauseBlack.svg";
import stopBlack from "../assets/icons/stopBlack.svg";

import "../styles/styles.css";
import { useEffect, useRef, useState } from "react";
import LoadingPage from "../components/LoadingPage";
import successAudio from '../assets/audio/pomodoroSuccess.mp3'
import sessionAudio from '../assets/audio/pomodoroSession.mp3'
import { addAchievementsCount } from "../models/achievements";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { createPomodoroNotification } from "../models/notifications";
import InfoCircle from "../components/InfoCircle";

/**
 * Pomodoro component manages the logic and UI for a Pomodoro timer.
 * It provides a timer that alternates between work and rest periods, as well as UI elements for controlling the timer.
 * 
 * @param {Object} props - The props for the component.
 * @param {boolean} props.active - Determines if the timer is active.
 * @param {boolean} props.isEnglish - Language preference.
 * @param {Function} props.setIsEnglish - Function to toggle language preference.
 * @param {boolean} props.isBlack - Theme preference (dark or light).
 * @param {Function} props.setIsBlack - Function to toggle theme preference.
 * @param {boolean} props.switchStyle - Style switch flag.
 * @param {Function} props.setSwitchStyle - Function to toggle style switch.
 * @param {Function} props.setIsNotificationRead - Function to set notification read status.
 * @param {boolean} props.isNotificationRead - Notification read status.
 * 
 * @returns {JSX.Element} The rendered Pomodoro component.
 */

function Pomodoro(props) {
  const {
    active,
    isEnglish,
    setIsEnglish,
    isBlack,
    setIsBlack,
    switchStyle,
    setSwitchStyle,
    setIsNotificationRead,
    isNotificationRead
  } = props;

  const [time, setTime] = useState(1500);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const decrement = useRef(null);
  const [isPlayClicked, setIsPlayClicked] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [stage, setStage] = useState(1);
  const [stars, setStars] = useState(stars_stage_one)

  const [isLoaded, setIsLoaded] = useState(false);

  const auth = useAuthUser()

  const playSuccessAudio = () => {
    let src
    if (stage < 4 || stage == 4 && !isPause) {
      src = successAudio
    }
    if (stage == 4 && isPause) {
      src = sessionAudio
    }
    new Audio(src).play()
  }

  const load = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }

  const addPomodoroCount = async () => {
    await addAchievementsCount(auth.id, {
      value: 'pomodoroWholeSessionsCount'
    })
    const notifications = await pomodoroNotification()
    if (notifications.status == 201) {
      setIsNotificationRead(notifications.isNotificationRead)
    }
  }

  const pomodoroNotification = async () => {
    await createPomodoroNotification(auth.id)
  }

  const playBtnClick = () => {
    if (!isPlayClicked) {
      decrement.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      setIsPlayClicked(true);
      return;
    }
  };

  const pauseBtnClick = () => {
    if (isPlayClicked) {
      clearInterval(decrement.current);
      setIsPlayClicked(false);
      return;
    }
  };

  const stopBtnClick = () => {
    setTime(1500);
    clearInterval(decrement.current);
    setIsPlayClicked(false);
    setStars(stars_stage_one)
    setStage(1)
  };

  useEffect(() => {
    if (time <= 0 && !isPause) {
      playSuccessAudio()
      setTime(300);
      setIsPause(true);
      return;
    }

    if (time <= 0 && isPause) {
      playSuccessAudio()
      setStage(prev => prev + 1)
      setTime(1500);
      setIsPause(false);
      return;
    }

    if (stage === 1) {
      setStars(stars_stage_one)
    }
    if (stage === 2) {
      setStars(stars_stage_two)
    }
    if (stage === 3) {
      setStars(stars_stage_three)
    }
    if (stage === 4) {
      setStars(stars_stage_four)
    }
    if (stage > 4) {
      setStars(stars_stage_one)
      setStage(1)
      clearInterval(decrement.current)
      setIsPlayClicked(false);
      addPomodoroCount()
    }

    formatter();
  }, [time, isPause, stage]);

  useEffect(() => {
    load()
  }, [])

  const formatter = () => {
    const minutesRaw = time / 60;
    const minutes = Math.floor(time / 60);
    let seconds;
    if (minutesRaw % 60 !== 0) {
      seconds = time - minutes * 60;
    }
    if (minutesRaw % 60 === 0) {
      seconds = 0;
    }

    setMinutes(minutes);
    setSeconds(seconds);
  };

  let headline;

  if (!isLoaded) {
    return (
      <>
        <LoadingPage />
      </>
    );
  }

  if (isPause) {
    headline = (
      <h2 style={{
        color: isBlack ? '#FFF' : '#333'
      }}>
        R<span className="blueLetter">ES</span>T
      </h2>
    );
  } else if (!isPause) {
    headline = (
      <h2 style={{
        color: isBlack ? '#FFF' : '#333'
      }}>
        FO<span className="blueLetter">C</span>US
      </h2>
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
          <div className="pomodoroCont">
            {headline}
            <div className="timeCont">
              <img className="stars" src={stars} alt="" />
              <h1 className="time">
                {minutes > 9 ? minutes : `0${minutes}`}:
                {seconds > 9 ? seconds : `0${seconds}`}
              </h1>
            </div>
            <div className="bottomBtnsCont">
              <div className="pauseBtnCont" onClick={pauseBtnClick}>
                <div style={{
                  borderColor: isBlack ? '#4D4D4D' : '#333',
                }} className="pauseBtn">
                  <img src={isBlack ? pauseBlack : pause} alt="" />
                </div>
                <div style={{
                  backgroundColor: isBlack ? '#4D4D4D' : '#333'
                }} className="border"></div>
              </div>
              <div className="playBtnCont">
                <div className="playBtn" onClick={playBtnClick}>
                  <img src={play} alt="" />
                </div>
                <div className="border"></div>
              </div>
              <div className="stopBtnCont" onClick={stopBtnClick}>
                <div style={{
                  borderColor: isBlack ? '#4D4D4D' : '#333'
                }}  className="stopBtn">
                  <img src={isBlack ? stopBlack : stop} alt="" />
                </div>
                <div style={{
                  backgroundColor: isBlack ? '#4D4D4D' : '#333'
                }}  className="border" ></div>
              </div>
            </div>
            <InfoCircle
              isBlack={isBlack}
              isEnglish={isEnglish}
              textEn={"Pomodoro is a special timer, that divides your work into sessions. There are 4 sessions of working for 25 minutes each and 4 rests for 5 minutes each. You will be notified after every session so you don't miss out. "}
              textCz={'Pomodoro je speciální timer, který rozděluje vaši práci do úseků. Jsou zde 4 úseky po 25 minutách, po kterých pracujete a 4 úseky po 5 minutách, kdy můžete odpočívat. Po skončení úseků dostanete oznámení.'}
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default Pomodoro;
