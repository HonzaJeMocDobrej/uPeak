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

import "../styles/styles.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { getTheFirstTodoPage } from "../models/todoPage";
import { checkIfImgExists } from "../functions/functions";
import { getTheFirstNote } from "../models/notes";

function LeftMenu(props) {
  const { active, isEnglish, isBlack } = props;

  const [height, setHeight] = useState(window.innerHeight);

  let navigate = useNavigate();

  const auth = useAuthUser();
  const [imgSrc, setImgSrc] = useState();

  const [firstTodoPageId, setFirstTodoPageId] = useState();
  const [firstNoteId, setFirstNoteId] = useState();

  const univNavigate = (path) => {
    navigate(path);
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
    console.log(id, username);
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
  };

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
  }, []);

  useEffect(() => {
    checkIfImgExists(setImgSrc, auth);
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
          <li onMouseUp={() => univNavigate("/progress")} className="selected">
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
          <li onMouseUp={() => univNavigate(`/todo/${firstTodoPageId}`)}>
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
          </li>
          <li onMouseUp={() => univNavigate(`/notes/${getNotesLastId()}`)}>
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
          </li>
          <li onMouseUp={() => univNavigate("/pomodoro")}>
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
          </li>
          <li onMouseUp={() => univNavigate("/profile")}>
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
