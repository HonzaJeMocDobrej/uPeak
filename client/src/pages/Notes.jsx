/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/TopMenu";
import NotesRightMenu from "../components/NotesRightMenu";

import "../styles/styles.css";
import { useEffect, useRef, useState } from "react";
import { getNote } from "../models/notes";
import { useParams } from "react-router-dom";

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

  const [heading, setHeading] = useState("");

  const headlineRef = useRef();
  const notesRef = useRef();
  const [headlineFocused, setHeadlineFocused] = useState(false);
  const [notesFocused, setNotesFocused] = useState(false);

  const { id } = useParams()

  const load = async () => {
    const note = await getNote()
  }

  const handlePlaceholder = () => {
      console.log(notesRef.current.textContent);
      if (notesRef.current.textContent === '') {
        console.log('banger');
        notesRef.current.innerHTML = "";
    }
  }

  const handleHealdine = () => {
    setHeading(headlineRef.current.textContent)
    if (headlineRef.current.textContent === '') {
      console.log('banger');
      headlineRef.current.innerHTML = "";
  }
}

const handleCusorPostion = (index, ref) => {
  ref.current.focus()
    setHeadlineFocused(true)
}

useEffect(() => {
    function handleKeyDown(e) {
      console.log(`Headline ${headlineFocused} Notes ${notesFocused}`);
        if (e.keyCode === 13) {
          if (!headlineFocused && !notesFocused) {
            setHeadlineFocused(true)
            headlineRef.current.focus();
            e.preventDefault()
          }

          if (headlineFocused && !notesFocused || headlineFocused && notesFocused) {
            setNotesFocused(true)
            notesRef.current.focus();
          }
        }

        if (e.keyCode === 40) {
          if (!headlineFocused && !notesFocused) {
            setHeadlineFocused(true)
            headlineRef.current.focus();
            e.preventDefault()
          }

          if (headlineFocused && !notesFocused || headlineFocused && notesFocused) {
            setNotesFocused(true)
            notesRef.current.focus();
          }
        }

        if (e.keyCode === 38) {
          if (!headlineFocused && !notesFocused) {
            setHeadlineFocused(true)
            notesRef.current.focus();
            e.preventDefault()
          }
        }

        // 1 key
        if (e.keyCode === 49 && e.ctrlKey) {
          setHeadlineFocused(true)
            headlineRef.current.focus();
            e.preventDefault()
        }

        // 2 key
        if (e.keyCode === 50 && e.ctrlKey) {
          setHeadlineFocused(true)
          notesRef.current.focus();
          e.preventDefault()
        }

        // esc key
        if (e.keyCode === 27) {
          notesRef.current.blur()
          headlineRef.current.blur()
          setHeadlineFocused(false)
          setNotesFocused(false)
        }

      }
  
      document.addEventListener('keydown', handleKeyDown);
      
      //clean up
      return function cleanup() {
        document.removeEventListener('keydown', handleKeyDown);
      }
}, [headlineFocused, notesFocused])

  

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
            <h2 onClick={() => handleCusorPostion(1, headlineRef)} onInput={handleHealdine} ref={headlineRef} data-ph='Untitled' spellCheck='false' contentEditable='true' className='notesHeadline'></h2>
            <p onClick={() => handleCusorPostion(1, notesRef)} onInput={handlePlaceholder} data-ph='Start Typing...' spellCheck='false' contentEditable='true' className='inputP' ref={notesRef}></p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Notes;
