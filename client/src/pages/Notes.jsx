/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/topMenu";
import NotesRightMenu from "../components/NotesRightMenu";
import TextareaAutosize from 'react-textarea-autosize';

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
  const [inputElements, setInputElements] = useState([
    {
    index: 0,
    focused: false,
    // id: nanoid(),
    notePlaceholder: false,
    text: 'ahoj'
  }, 
  //  {
  //   index: 0,
  //   focused: false,
  //   // id: nanoid(),
  //   notePlaceholder: false,
  //   text: ''
  // }
])
  const headlineRef = useRef()
  const notesRef = useRef([]);
  const [maxCount, setMaxCount] = useState(0);
  const [currentlyAtCount, setCurrentlyAtCount] = useState(0)
  const [isHeadingFocused, setIsHeadingFocused] = useState(false)

  const headingChange = (e) => {
    const { value } = e.target
    setHeading(value)
  }

  const handlePlaceholder = (id, val) => {
    let newElements = []
    inputElements.map(element => {
      if (element.index === id) {
        element = {
          focused: element.focused,
          index: element.index,
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
      if (element.index === id) {
        element = {
          focused: element.focused,
          index: element.index,
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
    setMaxCount(index + 1)
  }

  const createNewInput = () => {
    setInputElements(prev => {
      const index = currentlyAtCount - 1
      return [
        ...prev.slice(0, index),
        {
          focused: false,
          index: prev.length,
          notePlaceholder: false,
          text: ''
        },
        ...prev.slice(index)
      ]
    })
  }

  const resortArray = () => {
    setInputElements(prevs => {
      return(
        prevs.map((prev, index) => {
          return {
            ...prev,
            index: index 
          }
        })
        )
    })
  }

  

  useEffect(() => {

    const enterLogic = async (e) => {
      if (e.keyCode === 13) {
        e.preventDefault()
        if (!isHeadingFocused) {
          headlineRef.current.focus();
          setIsHeadingFocused(true)
          return
        }
        await createNewInput();
        setMaxCount(prev => prev + 1)
        setCurrentlyAtCount(prev => prev + 1)
        notesRef.current[currentlyAtCount].focus()
      }
    }
  
    const upLogic = async (e) => {
      if (e.keyCode === 38) {
        if (currentlyAtCount <= 1) {
          setCurrentlyAtCount(0)
          headlineRef.current.focus();
          return
        }
        setCurrentlyAtCount(prev => prev - 1)
        notesRef.current[currentlyAtCount - 2].focus()
      }
    }
  
    const downLogic = async (e) => {
      if (e.keyCode === 40) {
        if (currentlyAtCount === maxCount + 1) {
          setCurrentlyAtCount(maxCount + 1)
          return 
        }
        setCurrentlyAtCount(prev => prev + 1)
        notesRef.current[currentlyAtCount].focus()
      }
    }
  
    

    async function handleKeyDown(e) {
      console.log(`Max count: ${maxCount}, currentlyAtCount: ${currentlyAtCount}`);
      
      await enterLogic(e)
      resortArray()
      upLogic(e)
      downLogic(e)
      console.log(inputElements);
    }

    document.addEventListener('keydown', handleKeyDown);
    
    //clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [maxCount, inputElements.length, currentlyAtCount, isHeadingFocused, resortArray, inputElements])
  

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
                inputElements.map((element) => {
                  return <TextareaAutosize
                    onFocus={() => handleInputFocus(element.index)}
                    onBlur={() => handleInputBlur(element.index)}
                    onChange={() => handleTextChange(event, element.index)}
                    onMouseOut={() => handlePlaceholder(element.index, false)}
                    onMouseOver={() => handlePlaceholder(element.index, true)}
                    onClick={() => handleRightEnterCount(element.index)}
                    // style={{opacity: element.text === '' ? element.notePlaceholder ? 1 : 0 : 1}}
                    style={{opacity: element.focused ? 1 : 0 || element.notePlaceholder ? 1 : 0 || element.text === '' ? 0 : 1 }}
                    placeholder={'New Note'}
                    value={element.text}
                    className="inputP"
                    key={element.index}
                    ref={(el) => (notesRef.current[element.index] = el)}>

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
