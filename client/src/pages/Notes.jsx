/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/TopMenu";
import NotesRightMenu from "../components/NotesRightMenu";

import "../styles/styles.css";
import { useEffect, useRef, useState, useMemo } from "react";
import { getNote, patchNote } from "../models/notes";
import { useParams } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor } from "@blocknote/core";
import { darkDefaultTheme, lightDefaultTheme} from "@blocknote/mantine";

function Notes(props) {
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

  const [heading, setHeading] = useState("");
  const [virtualHeading, setVirtualHeading] = useState("");
  const [mainText, setMainText] = useState("");

  const headlineRef = useRef();
  const notesRef = useRef();
  const [headlineFocused, setHeadlineFocused] = useState(false);
  const [notesFocused, setNotesFocused] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isSearching, setIsSearching] = useState(false)

  const [initialContent, setInitialContent] = useState("loading");

  const { id } = useParams();

  const auth = useAuthUser()

  const darkOwnTheme = {
    ...darkDefaultTheme,
    colors: {
      ...darkDefaultTheme.colors,
      editor: {
        text: "#ffffff",
        background: "#333333",
      },
      sideMenu: "#ffffff",
      highlights: darkDefaultTheme.colors.highlights,
    },
  };

  const lightOwnTheme = {
    ...lightDefaultTheme,
    colors: {
      ...lightDefaultTheme.colors,
      editor: {
        text: "#333333",
        background: "#ffffff",
      },
      sideMenu: lightDefaultTheme.colors.sideMenu,
      highlights: lightDefaultTheme.colors.highlights,
    },
  };

  const lightDarkTheme = {
    light: lightOwnTheme,
    dark: darkOwnTheme
  }

  const load = async () => {
    const note = await getNote(auth.id, id);
    if (note.status === 500) {
      setIsLoaded(false);
      setHeading("");
      setVirtualHeading("");
      setMainText("");
      return;
    }
    if (note.status === 200) {
      setHeading(note.data.headline);
      setVirtualHeading(note.data.headline);
      setMainText(note.data.mainText);
      // console.log(note.data, heading, mainText)
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    }
  };

  const updateNotes = async (propname, value) => {
    const updateNotes = await patchNote(id, [
      {
        propName: propname,
        value: value,
      },
    ])
    // .catch((err) => console.log(err.response.data.msg));
    if (updateNotes.status === 200) {
      // console.log(updateNotes.data);
    }
  };

  const handlePlaceholder = async () => {
    updateNotes("mainText", notesRef.current.innerHTML);
    if (notesRef.current.textContent === "") {
      // console.log("banger");
      notesRef.current.innerHTML = "";
    }
  };

  const handleHealdine = async () => {
    setVirtualHeading(headlineRef.current.textContent);
    updateNotes("headline", headlineRef.current.textContent);
    // setIsSearching(false)
    if (headlineRef.current.textContent === "") {
      // console.log("banger");
      headlineRef.current.innerHTML = "";
    }
  };

  const handleCusorPostion = (index, ref) => {
    ref.current.focus();
    setHeadlineFocused(true);
  };

  const save = () => {
    //post to db
    // console.log(JSON.stringify(editor.document));
    // localStorage.setItem("notes", JSON.stringify(editor?.document as Block[]));
    patchNote(id,[
      {
        propName: 'value',
        value: JSON.stringify(editor?.document)
      }
    ])
    .then(data => console.log(data.data))
    console.log(JSON.stringify(editor?.document));
  };

  const loadBlocknote = async () => {
    const gotNote = await getNote(auth.id, id);
    if (gotNote.status === 500) {
      setIsLoaded(false);
      setHeading("");
      setVirtualHeading("");
      setMainText("");
      return;
    }
    if (gotNote.status === 200) {
      setHeading(gotNote.data.headline);
      setVirtualHeading(gotNote.data.headline);
      setInitialContent(JSON.parse(gotNote.data.value));
      console.log(gotNote.data)
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    }
    const storageString = gotNote.data.value
    return storageString
      ? (JSON.parse(storageString))
      : undefined;
      
  };

  

  useEffect(() => {
    function handleKeyDown(e) {
      // if (e.keyCode === 13) {
      //   if (!headlineFocused && !notesFocused) {
      //     setHeadlineFocused(true);
      //     headlineRef.current.focus();
      //     e.preventDefault();
      //   }

      //   if (
      //     (headlineFocused && !notesFocused) ||
      //     (headlineFocused && notesFocused)
      //   ) {
      //     setNotesFocused(true);
      //     notesRef.current.focus();
      //   }
      // }

      // if (e.keyCode === 40) {
      //   if (!headlineFocused && !notesFocused) {
      //     setHeadlineFocused(true);
      //     headlineRef.current.focus();
      //     e.preventDefault();
      //   }

      //   if (
      //     (headlineFocused && !notesFocused) ||
      //     (headlineFocused && notesFocused)
      //   ) {
      //     setNotesFocused(true);
      //     notesRef.current.focus();
      //   }
      // }

      // if (e.keyCode === 38) {
      //   if (!headlineFocused && !notesFocused) {
      //     setHeadlineFocused(true);
      //     notesRef.current.focus();
      //     e.preventDefault();
      //   }
      // }

      // 1 key
      if (e.keyCode === 49 && e.ctrlKey) {
        setHeadlineFocused(true);
        headlineRef.current.focus();
        e.preventDefault();
      }

      // 2 key
      if (e.keyCode === 50 && e.ctrlKey) {
        setHeadlineFocused(true);
        notesRef.current.focus();
        e.preventDefault();
      }

      // esc key
      if (e.keyCode === 27) {
        notesRef.current.blur();
        headlineRef.current.blur();
        setHeadlineFocused(false);
        setNotesFocused(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    //clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [headlineFocused, notesFocused]);

  useEffect(() => {
    // load()
    // console.log(heading, virtualHeading)
  }, [heading, id, mainText]);

  useEffect(() => {
    console.log(initialContent);
    loadBlocknote()
    .then(content => setInitialContent(content))
  }, [heading, id]);

  const editor = useMemo(() => {
    if (initialContent === "loading" && !isLoaded) {
      return undefined
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent, isLoaded]);

  if (editor === undefined) {
    return (
          <>
            <LoadingPage/>
          </>
        );
  }

  if (!isLoaded) {
    return (
      <>
        <LoadingPage/>
      </>
    );
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
          setIsNotificationRead={setIsNotificationRead}
          isNotificationRead={isNotificationRead}
        />
        <main className={`mainStuff ${isBlack ? "mainBlack" : null}`}>
          <NotesRightMenu
            virtualHeading={virtualHeading}
            setVirtualHeading={setVirtualHeading}
            paramsId={id}
            loadNote={loadBlocknote}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
            myNotesColor={isBlack ? '#CCC' : '#666'}
            bin={isBlack ? 'invert(100%)' : 'invert(0%)'}
            notesListClass={isBlack ? 'notesList notesListBlack' : 'notesList'}
            isEnglish={isEnglish}
            isBlack={isBlack}
            setIsNotificationRead={setIsNotificationRead}
            isNotificationRead={isNotificationRead}
          />
          <div className={`notesCont ${isBlack ? 'notesContBlack' : null}`}>
            <h2
              onClick={() => handleCusorPostion(1, headlineRef)}
              onInput={handleHealdine}
              ref={headlineRef}
              data-ph={isEnglish ? "Untitled" : 'Bez Názvu'}
              spellCheck="false"
              contentEditable="true"
              className="notesHeadline"
              style={{
                color: isBlack ? '#FFF' : '#333'
              }}
            >
              {!heading ? '' : heading}
            </h2>
            <BlockNoteView style={{marginTop: '1rem'}} editor={editor} theme={isBlack ? lightDarkTheme.dark : lightDarkTheme.light} onChange={save} />
          </div>
        </main>
      </div>
    </>
  );
}

export default Notes;
