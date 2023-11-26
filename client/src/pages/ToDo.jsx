/* eslint-disable react/prop-types */
import { useState } from "react";
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/topMenu";
import ToDoListItem from "../components/ToDoListItem";
import { ChromePicker } from 'react-color'

import "../styles/styles.css";

import pallette from '../assets/icons/Pallette.svg'
import priorityLightningFour from '../assets/icons/priorityLightningFour.svg'
import priorityLightningThree from '../assets/icons/priorityLightningThree.svg'
import priorityLightningTwo from '../assets/icons/priorityLightningTwo.svg'
import priorityLightningOne from '../assets/icons/priorityLightningOne.svg'

function ToDo(props) {
  const {
    active,
    isEnglish,
    setIsEnglish,
    isBlack,
    setIsBlack,
    switchStyle,
    setSwitchStyle,
  } = props;

  const prioCircleStyles = {
    prio1: {border: 'solid 2px #F00', backgroundColor: '#FFE5E5'},
    prio2: {border: 'solid 1.5px #00B232', backgroundColor: '#E5FFED'},
    prio3: {border: 'solid 1px #09F', backgroundColor: '#E5F5FF'},
    prio4: {border: 'solid 0.5px #ADADAD'}
  }

  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isPrioOpen, setIsPrioOpen] = useState(false)
  const [isCreateTodoOpen, setIsCreateTodoOpen] = useState(false)
  const [isPalletteOpen, setIsPalletteOpen] = useState(false)
  const [day, setDay] = useState("Today");
  const [headlineVal, setHeadlineVal] = useState('')
  const [shortDescVal, setShortDescVal] = useState('')

  const [todoData, setTodoData] = useState({
    headline: '',
    shortDesc: '',
    color: '#333',
    priority: ''
  })

  const prioImgTernary = todoData.priority === 1 ? 'lightPrio1'
   : todoData.priority === 2 ? 'lightPrio2'
   : todoData.priority === 3 ? 'lightPrio3'
   : todoData.priority === 4 ? 'lightPrio4' : ''

  const univToggle = (setState) => {
    setState(prev => !prev)
  }

  const selectDay = (day) => {
    setDay(day);
  };

  const updateHeadlineVal = (e) => {
    setHeadlineVal(e.target.value.length)
    setTodoData(prev => {
      return {
        ...prev,
        headline: e.target.value
      }
    })
  }
  
  const updateShortDescVal = (e) => {
    setShortDescVal(e.target.value.length)
    setTodoData(prev => {
      return {
        ...prev,
        shortDesc: e.target.value
      }
    })
  }

  const updatePrioVal = (prio) => {
    setTodoData(prev => {
      return {
        ...prev,
        priority: prio
      }
    })
    setIsPrioOpen(prev => !prev)
    console.log(todoData);
  }

  const closeCreateTodo = () => {
    setTodoData({
      headline: '',
      shortDesc: '',
      color: '#333',
      priority: ''
    })
    setIsCreateTodoOpen(false)
  }

  const changeColor = (color) => {
    setTodoData(prev => {
      return {
        ...prev,
        color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
      }
    })
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
        />
        <main className={`mainStuff ${isBlack ? "mainBlack" : null}`}>
          <div className="todoConts">
            <div className="topCont">
              <div className="dayTimeCont">
                <div
                  onClick={() => univToggle(setIsDayOpen)}
                  className={`h2Cont ${isDayOpen ? "rotate" : "goBack"}`}
                >
                  <h2>{day}</h2>
                  <ul
                    style={
                      isDayOpen ? { display: "flex" } : { display: "none" }
                    }
                    className="dropdown"
                  >
                    <li
                      onClick={() => selectDay("Today")}
                      className={day === "Today" ? "selectedLi" : null}
                    >
                      To-Do
                    </li>
                    <li
                      onClick={() => selectDay("Notes")}
                      className={day === "Notes" ? "selectedLi" : null}
                    >
                      Notes
                    </li>
                    <li
                      onClick={() => selectDay("Pomodoro")}
                      className={day === "Pomodoro" ? "selectedLi" : null}
                    >
                      Pomodoro
                    </li>
                  </ul>
                </div>
                <h4>Sat. 16 Sep</h4>
              </div>
              <div className="ctaGroupTodo">
                Create Group
              </div>
            </div>
            <div className="ctaGroupTodo leftCtaGroupTodo">Add Group</div>
            <div className="groupCont">
              <h2 className="groupHeadline">General</h2>
              <div className="todoListItemsCont">
                <h2 onClick={() => univToggle(setIsCreateTodoOpen)} className="ctaGroupTodo leftCtaGroupTodo">Add To-Do</h2>
                <div style={isCreateTodoOpen ? {display: "block"} : {display: "none"}} className="createToDo">
                  <div className="topInputCont">
                    <div className="imgAndInputCont">
                      <img onClick={() => univToggle(setIsPalletteOpen)} src={pallette} alt="" />
                      <input value={todoData.headline} onChange={updateHeadlineVal} style={{width: headlineVal === '' ? '8rem' : `${headlineVal}ch`, color: todoData.color === '#333' ? null : todoData.color}} className="headline" placeholder="Task Name..." type="text" maxLength={30} />
                    </div>
                    <input value={todoData.shortDesc} onChange={updateShortDescVal} style={shortDescVal === '' ? {width: '7rem'} : {width: `${shortDescVal}ch`}} className="shortDesc" placeholder="Short Description" type="text" maxLength={50} />
                  <ChromePicker
                    color={todoData.color}
                    onChange={changeColor}
                    className={isPalletteOpen ? 'palletteOpen' : 'palletteClose' }
                  />
                  </div>
                  <div className="bottomBtnCont">
                      <div onClick={() => univToggle(setIsPrioOpen)} className={`prioBtn ${prioImgTernary}`}>Priority</div>
                      <ul style={isPrioOpen ? {display: "flex"} : {display: "none"}} className="prioDropdown">
                        <li onClick={() => updatePrioVal(1)}>
                          <img src={priorityLightningOne} alt="" />
                          <p>Priority 1</p>
                        </li>
                        <li onClick={() => updatePrioVal(2)}>
                          <img src={priorityLightningTwo} alt="" />
                          <p>Priority 2</p>
                        </li>
                        <li onClick={() => updatePrioVal(3)}>
                          <img src={priorityLightningThree} alt="" />
                          <p>Priority 3</p>
                        </li>
                        <li onClick={() => updatePrioVal(4)}>
                          <img src={priorityLightningFour} alt="" />
                          <p>Priority 4</p>
                        </li>
                      </ul>
                    <div className="rightBtnCont">
                      <div onClick={closeCreateTodo} className="closeBtn">Close</div>
                      <div className="submitBtn">Submit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="groupCont">
              <h2 className="groupHeadline">Banger</h2>
              <div className="toDoListItemsCont">
                <ToDoListItem
                  name='Do The Dishes'
                  priorityCircleSx={prioCircleStyles.prio4}
                  priorityCircleHoverClass='prio4'
                  />
                <ToDoListItem
                  name='Meditate'
                  priorityCircleSx={prioCircleStyles.prio3}
                  priorityCircleHoverClass='prio3'
                  />
                <ToDoListItem
                  name='Meditate'
                  priorityCircleSx={prioCircleStyles.prio2}
                  priorityCircleHoverClass='prio2'
                  />
                <ToDoListItem
                  name='Meditate'
                  priorityCircleSx={prioCircleStyles.prio1}
                  priorityCircleHoverClass='prio1'
                  />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ToDo;
