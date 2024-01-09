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
  const notesRef = useRef([]);
  const [maxCount, setMaxCount] = useState(0);
  const [currentlyAtCount, setCurrentlyAtCount] = useState(0);
  const [isHeadingFocused, setIsHeadingFocused] = useState(false);

  const headingChange = (e) => {
    const { value } = e.target;
    setHeading(value);
  };

  const handlePlaceholder = (id, val) => {
    let newElements = [];
    inputElements.map((element) => {
      if (element.index === id) {
        element = {
          focused: element.focused,
          index: element.index,
          notePlaceholder: val,
          text: element.text,
          cursorPosition: cursorPosition.current,
        };
      }
      newElements = [...newElements, element];
    });
    setInputElements(newElements);
  };

  const handleInputFocus = (e, index) => {
    let items = [...inputElements];
    let item = { ...items[index] };

    items.map((item) => {
      item.focused = false;
    });
    item.focused = true;
    items[index] = item;
    setInputElements(items);
  };

  const handleInputBlur = (e, index) => {
    let items = [...inputElements];
    let item = { ...items[index] };

    items.map((item) => {
      item.focused = false;
    });
    item.focused = false;
    items[index] = item;
    setInputElements(items);
  };

  const handleTextChange = (e, id) => {
    let newElements = [];
    inputElements.map((element) => {
      if (element.index === id) {
        element = {
          focused: element.focused,
          index: element.index,
          notePlaceholder: element.notePlaceholder,
          text: e.target.value,
          cursorPosition: cursorPosition.current,
        };
      }
      newElements = [...newElements, element];
    });
    setInputElements(newElements);
    console.log(newElements);
  };

  const handleOnClick = (e, index) => {
    if (index < 0) {
      setCurrentlyAtCount(0);
      setIsHeadingFocused(true);
      return;
    }
    setCurrentlyAtCount(index + 1);
    setIsHeadingFocused(true);
  };

  const createNewInput = (value) => {
    let index;
    setInputElements((prev) => {
      currentlyAtCount === 0
        ? (index = currentlyAtCount - 2)
        : (index = currentlyAtCount - 1);

      return [
        ...prev.slice(0, index),
        {
          focused: false,
          index: prev.length,
          notePlaceholder: false,
          text: value,
          cursorPosition: 0,
        },
        ...prev.slice(index),
      ];
    });
  };

  const resortArray = () => {
    setInputElements((prevs) => {
      return prevs.map((prev, index) => {
        return {
          ...prev,
          index: index,
        };
      });
    });
  };

  const handleOnKeyDown = () => {
    setInputElements((prevs) => {
      return prevs.map((prev) => {
        return {
          ...prev,
        };
      });
    });
  };

  const splitText = (id) => {
    const splitIndex = cursorPosition.current;
    const first = inputElements[currentlyAtCount - 1].text.slice(0, splitIndex);
    const second = inputElements[currentlyAtCount - 1].text.slice(splitIndex);
    let newElements = [];

    inputElements.map((element) => {
      if (element.index === id) {
        element = {
          focused: element.focused,
          index: element.index,
          notePlaceholder: element.notePlaceholder,
          text: second,
          cursorPosition: cursorPosition.current,
        };
      }

      newElements = [...newElements, element];
    });
    setInputElements(newElements);

    return first;
  };

  const addText = (id) => {
    const first = inputElements[currentlyAtCount - 1].text;
    const second = inputElements[currentlyAtCount - 2].text;
    const final = second.concat(first);

    let newElements = [];

    inputElements.map((element) => {
      if (element.index === id) {
        element = {
          focused: element.focused,
          index: element.index,
          notePlaceholder: element.notePlaceholder,
          text: final,
          cursorPosition: cursorPosition.current,
        };
      }

      newElements = [...newElements, element];
    });
    setInputElements(newElements);
    deleteInput(currentlyAtCount - 1);
  };

  const deleteInput = (index) => {
    setInputElements((prev) =>
      prev.filter((element) => element.index !== index)
    );
  };

  useEffect(() => {
    const enterLogic = async (e) => {
      e.preventDefault();
      if (!isHeadingFocused) {
        headlineRef.current.focus();
        setIsHeadingFocused(true);
        return;
      }
      if (currentlyAtCount === 0) {
        await createNewInput("");
      }

      if (currentlyAtCount > 0) {
        if (inputElements[currentlyAtCount - 1].text === "") {
          await createNewInput("");
        } else {
          await createNewInput(splitText(currentlyAtCount - 1));
        }
      }
      setMaxCount((prev) => prev + 1);
      setCurrentlyAtCount((prev) => prev + 1);

      notesRef.current[currentlyAtCount].focus();
      let foo = cursorPosition.current;
      currentArea.current = notesRef.current[currentlyAtCount];
      setTimeout(() => {
        cursorPosition.current = foo;
        notesRef.current[currentlyAtCount].focus();
        currentArea.current.selectionStart = cursorPosition.current;
        currentArea.current.selectionEnd = cursorPosition.current;
      });
    };

    const upLogic = async (e) => {
      if (!isHeadingFocused) {
        headlineRef.current.focus();
        setIsHeadingFocused(true);
        return;
      }
      if (currentlyAtCount <= 1) {
        setCurrentlyAtCount(0);
        headlineRef.current.focus();
        return;
      }
      setCurrentlyAtCount((prev) => prev - 1);
      let foo = cursorPosition.current;
      currentArea.current = notesRef.current[currentlyAtCount - 2];
      setTimeout(() => {
        cursorPosition.current = foo;
        notesRef.current[currentlyAtCount - 2].focus();
        currentArea.current.selectionStart = cursorPosition.current;
        currentArea.current.selectionEnd = cursorPosition.current;
      });
    };

    const downLogic = async (e) => {
      if (!isHeadingFocused) {
        headlineRef.current.focus();
        setIsHeadingFocused(true);
        return;
      }
      if (currentlyAtCount === maxCount) {
        setCurrentlyAtCount(maxCount);
        return;
      }
      setCurrentlyAtCount((prev) => prev + 1);
      let foo = cursorPosition.current;
      currentArea.current = notesRef.current[currentlyAtCount];
      setTimeout(() => {
        cursorPosition.current = foo;
        notesRef.current[currentlyAtCount].focus();
        currentArea.current.selectionStart = cursorPosition.current;
        currentArea.current.selectionEnd = cursorPosition.current;
      });
    };

    const backspaceLogic = async (e) => {
      if (inputElements.length === 1) {
        return;
      }
      if (
        inputElements[currentlyAtCount - 1].text === "" &&
        currentlyAtCount === 1
      ) {
        await deleteInput(currentlyAtCount - 1);
        setCurrentlyAtCount((prev) => prev - 1);
        setMaxCount((prev) => prev - 1);
        headlineRef.current.focus();
        e.preventDefault();
        resortArray();
      }

      if (
        inputElements[currentlyAtCount - 1].text === "" &&
        currentlyAtCount !== 1
      ) {
        await deleteInput(currentlyAtCount - 1);
        setCurrentlyAtCount((prev) => prev - 1);
        setMaxCount((prev) => prev - 1);
        e.preventDefault();
        resortArray();

        let foo = 0;
        currentArea.current = notesRef.current[currentlyAtCount - 2];

        setTimeout(() => {
          cursorPosition.current = foo;
          currentArea.current.selectionStart = cursorPosition.current;
          notesRef.current[currentlyAtCount - 2].focus();
          currentArea.current.selectionEnd = cursorPosition.current;
        });

        if (currentlyAtCount <= 1) {
          return;
        }
      }

      if (
        e.target.selectionStart === 0 &&
        e.target.selectionEnd === 0 &&
        inputElements[currentlyAtCount - 1].text !== "" &&
        currentlyAtCount > 1
      ) {
        // console.log(inputElements[currentlyAtCount - 1].text);
        await addText(currentlyAtCount - 2);

        setCurrentlyAtCount((prev) => prev - 1);
        setMaxCount((prev) => prev - 1);
        e.preventDefault();
        resortArray();
        let foo = 0;
        currentArea.current = notesRef.current[currentlyAtCount - 2];

        setTimeout(() => {
        cursorPosition.current = foo;
        currentArea.current.selectionStart = cursorPosition.current;
        notesRef.current[currentlyAtCount - 2].focus();
        currentArea.current.selectionEnd = cursorPosition.current;
      });
      }

      

      
    };

    async function handleKeyDown(e) {
      if (e.keyCode === 40) {
        return downLogic(e);
      }
      if (e.keyCode === 38) {
        return upLogic(e);
      }
      if (e.keyCode === 8) {
        return backspaceLogic(e);
      }
      if (e.keyCode === 13) {
        await enterLogic(e);
        return resortArray();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    //clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    maxCount,
    inputElements.length,
    currentlyAtCount,
    isHeadingFocused,
    resortArray,
    inputElements,
  ]);

  useEffect(() => {
    setMaxCount(inputElements.length);
  }, []);

  const handleSelect = (e) => {
    cursorPosition.current = e.target.selectionEnd;
    handleOnKeyDown();
  };

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
            <TextareaAutosize
              ref={headlineRef}
              onClick={() => handleOnClick(event, -1)}
              onChange={headingChange}
              className="heading"
              placeholder="Untitled"
            ></TextareaAutosize>
            <div className="allNotesCont">
              {/* <TextareaAutosize onChange={textChange} onMouseOut={() => handlePlaceholder(false)} onMouseOver={() => handlePlaceholder(true)} style={{opacity: text === '' ? notePlaceholder ? 1 : 0 : 1}} placeholder={'New Note'} className="inputP"></TextareaAutosize> */}
              {inputElements.map((element) => {
                return (
                  <TextareaAutosize
                    onFocus={(e) => handleInputFocus(e, element.index)}
                    onBlur={(e) => handleInputBlur(e, element.index)}
                    onChange={(e) => handleTextChange(e, element.index)}
                    onMouseOut={() => handlePlaceholder(element.index, false)}
                    onMouseOver={() => handlePlaceholder(element.index, true)}
                    onClick={() => handleOnClick(event, element.index)}
                    onSelect={handleSelect}
                    // style={{opacity: element.text === '' ? element.notePlaceholder ? 1 : 0 : 1}}
                    style={{
                      opacity: element.focused
                        ? 1
                        : 0 || element.notePlaceholder
                        ? 1
                        : 0 || element.text === ""
                        ? 0
                        : 1,
                    }}
                    placeholder={"New Note"}
                    value={element.text}
                    className="inputP"
                    key={element.index}
                    ref={(el) => (notesRef.current[element.index] = el)}
                  ></TextareaAutosize>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Notes;
