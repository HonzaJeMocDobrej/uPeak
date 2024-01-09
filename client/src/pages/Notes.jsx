/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/topMenu";
import NotesRightMenu from "../components/NotesRightMenu";
import TextareaAutosize from "react-textarea-autosize";

import "../styles/styles.css";
import { useEffect, useRef, useState } from "react";

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

  const cursorPosition = useRef();
  const currentArea = useRef();
  const [heading, setHeading] = useState("");
  const [inputElements, setInputElements] = useState([
    {
      index: 0,
      focused: false,
      // id: nanoid(),
      notePlaceholder: false,
      text: "ahoj",
      cursorPosition: 0,
    },
    {
      index: 1,
      focused: false,
      notePlaceholder: false,
      text: "asdf",
      cursorPosition: 0,
    },
  ]);
  const headlineRef = useRef();
  const notesRef = useRef();
  const [maxCount, setMaxCount] = useState(0);
  const [currentlyAtCount, setCurrentlyAtCount] = useState(0);
  const [isHeadingFocused, setIsHeadingFocused] = useState(false);

  const handlePlaceholder = () => {
      console.log(notesRef.current.textContent);
      if (notesRef.current.textContent === '') {
        console.log('banger');
        notesRef.current.innerHTML = "";
    }
  }

  const handleHealdine = () => {
    console.log(headlineRef.current.textContent);
    if (headlineRef.current.textContent === '') {
      console.log('banger');
      headlineRef.current.innerHTML = "";
  }
}

useEffect(() => {
    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            console.log('enter');
        }
      }
  
      document.addEventListener('keydown', handleKeyDown);
      
      //clean up
      return function cleanup() {
        document.removeEventListener('keydown', handleKeyDown);
      }
}, [])

  

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
          <NotesRightMenu noteNames={heading} />
          <div className="notesCont">
            <h2 onInput={handleHealdine} ref={headlineRef} data-ph='Untitled' spellCheck='false' contentEditable='true' className='headline'></h2>
            <p onInput={handlePlaceholder} data-ph='Start Typing...' spellCheck='false' contentEditable='true' className='inputP' ref={notesRef}></p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Notes;
