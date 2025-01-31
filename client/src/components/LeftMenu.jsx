/* eslint-disable react/prop-types */
import trophyFill from "../assets/icons/trophyFill.svg";
import checkFillSvg from "../assets/icons/checkFill.svg";
import plusFillSvg from "../assets/icons/plusCircleFill.svg";
import clockFillSvg from "../assets/icons/clockFill.svg";
import userFillSvg from "../assets/icons/userCircleFill.svg";

import trophy from "../assets/icons/trophy.svg";
import checkSvg from "../assets/icons/check.svg";
import plusSvg from "../assets/icons/plusCircle.svg";
import clockSvg from "../assets/icons/clock.svg";
import userSvg from "../assets/icons/userCircle.svg";

import trophyWhiteSvg from "../assets/icons/trophyWhite.svg";
import checkWhiteSvg from "../assets/icons/checkWhite.svg";
import plusWhiteSvg from "../assets/icons/plusCircleWhite.svg";
import clockWhiteSvg from "../assets/icons/clockWhite.svg";
import userWhiteSvg from "../assets/icons/userCircleWhite.svg";
import basicProfPic from '../assets/img/userPicBasic.svg'

import fireYellow from '../assets/icons/fire_yellow.svg'
import fireOrange from '../assets/icons/fire_orange.svg'
import fireRed from '../assets/icons/fire_red.svg'
import firePurple from '../assets/icons/fire_purple.svg'

import "../styles/styles.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { createTodoPage, deleteOldTodoPages, getTheFirstTodoPage } from "../models/todoPage";
import { checkIfImgExists, formatDate, formatFullDate } from "../functions/functions";
import { getTheFirstNote } from "../models/notes";
import { getUserStats, patchStats } from "../models/stats";

function LeftMenu(props) {
  const { active, isEnglish, isBlack } = props;

  const [height, setHeight] = useState(window.innerHeight);

  let navigate = useNavigate();

  const auth = useAuthUser();
  const [imgSrc, setImgSrc] = useState();

  const [firstTodoPageId, setFirstTodoPageId] = useState();
  const [firstNoteId, setFirstNoteId] = useState();

  const [progressData, setProgressData] = useState({})
  const [fireType, setFireType] = useState({})

  const nowDate = new Date()

  const loadDeleted = async (userId) => {
    const todoPage = await deleteOldTodoPages(userId);
    if (todoPage.status === 200) {
      // console.log(todoPage.msg);
    }
  };

  const groupPageDateHandler = () => {
    const day = nowDate.getDate()
    const month = nowDate.getMonth() + 1 
    const year = nowDate.getFullYear()
    return formatDate(nowDate.getDay(), day, month, year)
  }

  const handleNav = async (path) => {
    navigate(path);
    const todaysDate = parseInt(formatFullDate(nowDate.getDate(), nowDate.getMonth() + 1, nowDate.getFullYear()))
    // console.log(todaysDate);

    const getStats = await getUserStats(auth.id)
    if (getStats == 200) return // console.log(getStats.msg)
    // console.log(getStats.data)

    if (path.startsWith('/todo')) {
      if (todaysDate == getStats.data.todoLastLogin) return
      if (todaysDate - getStats.data.todoLastLogin == 1) {
        await patchStats(auth.id, [
          {
            propName: 'todoLastLogin',
            value: `${todaysDate}`
          },
          {
            propName: 'todoStreak',
            value: getStats.data.todoStreak + 1
          },
          {
            propName: 'todoTotal',
            value: getStats.data.todoTotal + 1
          }
        ])
      }
      if (todaysDate - getStats.data.todoLastLogin >= 2) {
        await patchStats(auth.id, [
          {
            propName: 'todoLastLogin',
            value: `${todaysDate}`
          },
          {
            propName: 'todoStart',
            value: `${todaysDate}`
          },
          {
            propName: 'todoStreak',
            value: 0
          },
          {
            propName: 'todoTotal',
            value: getStats.data.todoTotal + 1
          }
        ])
      }
    }
    if (path.startsWith('/notes')) {
      if (todaysDate == getStats.data.notesLastLogin) return
      if (todaysDate - getStats.data.notesLastLogin == 1) {
        await patchStats(auth.id, [
          {
            propName: 'notesLastLogin',
            value: `${todaysDate}`
          },
          {
            propName: 'notesStreak',
            value: getStats.data.notesStreak + 1
          },
          {
            propName: 'notesTotal',
            value: getStats.data.notesTotal + 1
          }
        ])
      }
      if (todaysDate - getStats.data.notesLastLogin >= 2) {
        await patchStats(auth.id, [
          {
            propName: 'notesLastLogin',
            value: `${todaysDate}`
          },
          {
            propName: 'notesStart',
            value: `${todaysDate}`
          },
          {
            propName: 'notesStreak',
            value: 0
          },
          {
            propName: 'notesTotal',
            value: getStats.data.notesTotal + 1
          }
        ])
      }
    }
    if (path.startsWith('/pomodoro')) {
      if (todaysDate == getStats.data.pomodoroLastLogin) return
      if (todaysDate - getStats.data.pomodoroLastLogin == 1) {
        await patchStats(auth.id, [
          {
            propName: 'pomodoroLastLogin',
            value: `${todaysDate}`
          },
          {
            propName: 'pomodoroStreak',
            value: getStats.data.pomodoroStreak + 1
          },
          {
            propName: 'pomodoroTotal',
            value: getStats.data.pomodoroTotal + 1
          }
        ])
      }
      if (todaysDate - getStats.data.pomodoroLastLogin >= 2) {
        await patchStats(auth.id, [
          {
            propName: 'pomodoroLastLogin',
            value: `${todaysDate}`
          },
          {
            propName: 'pomodoroStart',
            value: `${todaysDate}`
          },
          {
            propName: 'pomodoroStreak',
            value: 0
          },
          {
            propName: 'pomodoroTotal',
            value: getStats.data.pomodoroTotal + 1
          }
        ])
      }
    }
  };

  const selectedStyle = {
    color: "#09F",
    fontWeight: 700,
  };

  const handleGetFirstNote = async () => {
    const firstNote = await getTheFirstNote(auth.id)
    if (firstNote.status == 200) {
      setFirstNoteId(firstNote.data.id)
    }
  }

  const getNotesLastId = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; `)
    let count = [0, 0]
    for (let part of parts){
        if (part.startsWith(`${auth.username}NoteId=`)) {
            break
        }
        count[0] = count[0] + 1  //position in arr      
    }
    for (let part of parts){
      if (part.startsWith(`${auth.username}=`)) {
          break
      }
      count[1] = count[1] + 1  //position in arr
  }
    const idString = parts[count[0]]
    const userString = parts[count[1]]
    if (!idString || !userString) return firstNoteId
    const idSplitter = auth.username.length + 7
    const userSplitter = auth.username.length + 1
    const id = parseInt(idString.substring(idSplitter))
    const username = userString.substring(userSplitter)
    // console.log(id, username);
    if (username != auth.username) {
      return firstNoteId
    }
    if (id) return id
    return firstNoteId
  }

  const load = async () => {
    const todoPages = await getTheFirstTodoPage(auth.id);
    if (todoPages.status === 200) {
      setFirstTodoPageId(todoPages.data.id);
    }

    const stats = await getUserStats(auth.id)
    if(stats.status === 500) return;
      if(stats.status === 200){
        setProgressData(stats.data);
      }
  };

  const createTodoPageOnLoad = async () => {
    const createdTodoPage = await createTodoPage(auth.id, groupPageDateHandler())
    setFirstTodoPageId(createdTodoPage.data.id)
    // console.log('create')
    return
  }

  const determineFireType = () => {
    const counterFormatter = (streakNum, setPage) => {
      if (streakNum < 1) {
        setFireType(prev => {
          return {
            ...prev,
            [setPage]: '' 
          }
        })
      }
      if (streakNum >= 1 && streakNum < 7) {
        setFireType(prev => {
          return {
            ...prev,
            [setPage]: fireYellow 
          }
        })
      }
  
      if (streakNum >= 7 && streakNum < 31) {
        setFireType(prev => {
          return {
            ...prev,
            [setPage]: fireOrange 
          }
        })
      }
  
      if (streakNum >= 31 && streakNum < 91) {
        setFireType(prev => {
          return {
            ...prev,
            [setPage]: fireRed 
          }
        })
      }
      if (streakNum >= 91) {
        setFireType(prev => {
          return {
            ...prev,
            [setPage]: firePurple 
          }
        })
      }
    }


    for (const key in progressData) {
        // console.log(`${key}: ${progressData[key]}`)
        if (key == 'todoStreak') {
          counterFormatter(progressData[key], 'todo')
        }
        if (key == 'notesStreak') {
          counterFormatter(progressData[key], 'notes')
        }
        if (key == 'pomodoroStreak') {
          counterFormatter(progressData[key], 'pomodoro')
        }
      }
    }

  useEffect(() => {
    const handleResize = () => {
      // console.log(`changed, height: ${height}`);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    load();
    handleGetFirstNote()
    getNotesLastId()
    loadDeleted()
    createTodoPageOnLoad()
    // console.log(fireType)
  }, []);
  
  useEffect(() => {
    determineFireType()
  }, [progressData])

  useEffect(() => {
    checkIfImgExists(setImgSrc, auth.profilePic, basicProfPic);
  }, [auth]);

  

  return (
    <>
      <nav className={`lMenu ${isBlack ? "lBlack" : null}`}>
        <div className="nameCont">
          <h1 className="fullHeading">
            u
            <span className="blackSpan">
              Peak<div className="underline"></div>
            </span>
          </h1>
          <h1 className="shortHeading">
            u
            <span className="blackSpan">
              P<div className="underline"></div>
            </span>
          </h1>
        </div>
        <ul
          style={height <= 650 ? { height: `${height / 10}%` } : null}
          className="itemsCont"
        >
          <li onMouseUp={() => handleNav("/progress")} className="selected">
            <img
              src={
                active === "progress"
                  ? trophyFill
                  : isBlack === true
                  ? trophyWhiteSvg
                  : trophy
              }
              alt=""
            />
            <p style={active === "progress" ? selectedStyle : null}>
              {isEnglish ? "Progress" : "Progres"}
            </p>
          </li>
          <li onMouseUp={() => handleNav(`/todo/${firstTodoPageId}`)}>
            <img
              src={
                active === "todo"
                  ? checkFillSvg
                  : isBlack === true
                  ? checkWhiteSvg
                  : checkSvg
              }
              alt=""
            />
            <p style={active === "todo" ? selectedStyle : null}>To-Do</p>
            <img style={{display: !fireType.todo ? 'none' : 'block'}} className="fire" src={fireType.todo} alt="" />
          </li>
          <li onMouseUp={() => handleNav(`/notes/${getNotesLastId()}`)}>
            <img
              src={
                active === "notes"
                  ? plusFillSvg
                  : isBlack === true
                  ? plusWhiteSvg
                  : plusSvg
              }
              alt=""
            />
            <p style={active === "notes" ? selectedStyle : null}>
              {isEnglish ? "Notes" : "Poznámky"}
            </p>
            <img style={{display: !fireType.notes ? 'none' : 'block'}} className="fire" src={fireType.notes} alt="" />
          </li>
          <li onMouseUp={() => handleNav("/pomodoro")}>
            <img
              src={
                active === "pomodoro"
                  ? clockFillSvg
                  : isBlack === true
                  ? clockWhiteSvg
                  : clockSvg
              }
              alt=""
            />
            <p style={active === "pomodoro" ? selectedStyle : null}>Pomodoro</p>
            <img style={{display: !fireType.pomodoro ? 'none' : 'block'}} className="fire" src={fireType.pomodoro} alt="" />
          </li>
          <li onMouseUp={() => handleNav("/profile")}>
            <img
              className="profilePic"
              src={
                active === "profile"
                  ? userFillSvg
                  : isBlack === true
                  ? userWhiteSvg
                  : userSvg
              }
              alt=""
            />
            <img
              style={{ maxHeight: "4rem", maxWidth: "5rem" }}
              className="honzak"
              src={imgSrc}
              alt=""
            />
            <p style={active === "profile" ? selectedStyle : null}>
              {isEnglish ? "Profile" : "Profil"}
            </p>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default LeftMenu;
