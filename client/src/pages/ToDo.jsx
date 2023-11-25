/* eslint-disable react/prop-types */
import { useState } from "react";
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/topMenu";
import ToDoListItem from "../components/ToDoListItem";

import "../styles/styles.css";

import pallette from '../assets/icons/Pallette.svg'

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
  const [day, setDay] = useState("Today");
  const [headlineVal, setHeadlineVal] = useState('')
  const [shortDescVal, setShortDescVal] = useState('')

  const toggleDropdownPage = () => {
    setIsDayOpen((prev) => !prev);
  };

  const selectDay = (day) => {
    setDay(day);
  };

  const updateHeadlineVal = (e) => {
    setHeadlineVal(e.target.value.length)
  }
  
  const updateShortDescVal = (e) => {
    setShortDescVal(e.target.value.length)
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
                  onClick={toggleDropdownPage}
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
                <h2 className="ctaGroupTodo leftCtaGroupTodo">Add To-Do</h2>
                <div className="createToDo">
                  <div className="topInputCont">
                    <div className="imgAndInputCont">
                      <img src={pallette} alt="" />
                      <input onChange={updateHeadlineVal} style={headlineVal === '' ? {width: '8rem'} : {width: `${headlineVal}ch`}} className="headline" placeholder="Task Name..." type="text" maxLength={30} />
                    </div>
                    <input onChange={updateShortDescVal} style={shortDescVal === '' ? {width: '7rem'} : {width: `${shortDescVal}ch`}} className="shortDesc" placeholder="Short Description" type="text" maxLength={50} />
                  </div>
                  <div className="bottomBtnCont">
                      <div className="prioBtn">Priority</div>
                    <div className="rightBtnCont">
                      <div className="closeBtn">Close</div>
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
