/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/topMenu";
import NotesRightMenu from "../components/NotesRightMenu";
import TextareaAutosize from 'react-textarea-autosize';
import { nanoid } from "nanoid";

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
  
  const [heading, setHeading] = useState('')
  const [inputElements, setInputElements] = useState([{
    focused: false,
    id: nanoid(),
    notePlaceholder: false,
    text: ''
  }, {
    focused: false,
    id: nanoid(),
    notePlaceholder: false,
    text: ''
  }, {
    focused: false,
    id: nanoid(),
    notePlaceholder: false,
    text: ''
  }, {
    focused: false,
    id: nanoid(),
    notePlaceholder: false,
    text: ''
  }])
  const headlineRef = useRef()
  const notesRef = useRef([]);
  const [enterCount, setEnterCount] = useState(-1);

  const headingChange = (e) => {
    const { value } = e.target
    setHeading(value)
  }

  const handlePlaceholder = (id, val) => {
    let newElements = []
    inputElements.map(element => {
      if (element.id === id) {
        element = {
          focused: element.focused,
          id: element.id,
          notePlaceholder: val,
          text: element.text
        }
      }
      newElements = [...newElements, element]
    })
    setInputElements(newElements)
  }

  const handleInputFocus = (index) => {
    let items = [...inputElements];
    let item = {...items[index]};
    
    items.map(item => {
      item.focused = false
    })
    item.focused = true;
    items[index] = item;
    setInputElements(items);
  }

  const handleInputBlur = (index) => {
    let items = [...inputElements];
    let item = {...items[index]};
    
    items.map(item => {
      item.focused = false
    })
    item.focused = false;
    items[index] = item;
    setInputElements(items);
  }

  const handleTextChange = (e, id) => {
    let newElements = []
    inputElements.map(element => {
      if (element.id === id) {
        element = {
          focused: element.focused,
          id: element.id,
          notePlaceholder: element.notePlaceholder,
          text: e.target.value
        }
      }
      newElements = [...newElements, element]
    })
    setInputElements(newElements)
    console.log(newElements);
  }

  const handleRightEnterCount = (index) => {
    setEnterCount(index + 1)
  }

  useEffect(() => {
    function handleKeyDown(e) {
      console.log(enterCount);
      if (e.keyCode === 13) {
      //   if (enterCount >= inputElements.length) {
      //     return setEnterCount(enterCount)
      //   }
        setEnterCount(prev => prev + 1)
        if (enterCount === -1) {
          headlineRef.current.focus();
          e.preventDefault()
          console.log(headlineRef.current.focus());
        }

        if (enterCount >= 0) {
          notesRef.current[enterCount].focus();
          e.preventDefault();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    
    //clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [enterCount])
  

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
          <div  className="notesCont">
            <TextareaAutosize ref={headlineRef} onClick={() => handleRightEnterCount(-1)} onChange={headingChange} className="heading" placeholder="Untitled" ></TextareaAutosize>
            <div className="allContsCont">
              {/* <TextareaAutosize onChange={textChange} onMouseOut={() => handlePlaceholder(false)} onMouseOver={() => handlePlaceholder(true)} style={{opacity: text === '' ? notePlaceholder ? 1 : 0 : 1}} placeholder={'New Note'} className="inputP"></TextareaAutosize> */}
              {
                inputElements.map((element, index) => {
                  return <TextareaAutosize
                    onFocus={() => handleInputFocus(index)}
                    onBlur={() => handleInputBlur(index)}
                    onChange={() => handleTextChange(event, element.id)}
                    onMouseOut={() => handlePlaceholder(element.id, false)}
                    onMouseOver={() => handlePlaceholder(element.id, true)}
                    onClick={() => handleRightEnterCount(index)}
                    // style={{opacity: element.text === '' ? element.notePlaceholder ? 1 : 0 : 1}}
                    style={{opacity: element.focused ? 1 : 0 || element.notePlaceholder ? 1 : 0 || element.text === '' ? 0 : 1 }}
                    placeholder={'New Note'}
                    className="inputP"
                    key={index}
                    ref={(ref) => notesRef.current.push(ref)}>

                    </TextareaAutosize>
                })
              }
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Notes;
