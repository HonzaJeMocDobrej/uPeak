/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/topMenu";
import NotesRightMenu from "../components/NotesRightMenu";
import TextareaAutosize from 'react-textarea-autosize';

import "../styles/styles.css";
import { useRef, useState } from "react";


function Notes(props) {
  const {
    active,
    isEnglish,
    setIsEnglish,
    isBlack,
    setIsBlack,
    switchStyle,
    setSwitchStyle,
  } = props;
  
  const [heading, setHeading] = useState('')

  const headingChange = (e) => {
    const { value } = e.target
    setHeading(value)
  }
  
  return (
    <>
      <div className="menuCont">
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
          <NotesRightMenu
            noteNames={heading}
          />
          <div className="notesCont">
            <TextareaAutosize onChange={headingChange} className="heading" placeholder="Untitled" ></TextareaAutosize>
            <div className="allContsCont">
              <textarea className="inputP"></textarea>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Notes;
