/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/TopMenu";
import ToDoListItem from "../components/ToDoListItem";
import { ChromePicker } from 'react-color'

import "../styles/styles.css";

import pallette from '../assets/icons/Pallette.svg'
import priorityLightningFour from '../assets/icons/priorityLightningFour.svg'
import priorityLightningThree from '../assets/icons/priorityLightningThree.svg'
import priorityLightningTwo from '../assets/icons/priorityLightningTwo.svg'
import priorityLightningOne from '../assets/icons/priorityLightningOne.svg'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

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

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isPrioOpen, setIsPrioOpen] = useState(false)
  const [isCreateTodoOpen, setIsCreateTodoOpen] = useState(false)
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [isGroupAddOpen, setIsGroupAddOpen] = useState(false)
  const [isPalletteOpen, setIsPalletteOpen] = useState(false)
  const [isPalletteGroupOpen, setIsPalletteGroupOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState({
    dayNum: null,
    dayName: null,
    monthNum: null,
    monthName: null,
    year: null
  })

  const now = new Date

  const [todoData, setTodoData] = useState({
    headline: '',
    shortDesc: '',
    color: '#333',
    priority: '',
  })

  const [groupData, setGroupData] = useState({
    headline: '',
    color: '#333',
  })

  const [todos, setTodos] = useState([])
  const [groups, setGroups] = useState([
    {
      headline: 'General',
      color: '#333'
    },
    {
      headline: 'Banger',
      color: '#FF3D00'
    }
  ])

  const prioImgTernary = todoData.priority === 1 ? 'lightPrio1'
   : todoData.priority === 2 ? 'lightPrio2'
   : todoData.priority === 3 ? 'lightPrio3'
   : todoData.priority === 4 ? 'lightPrio4' : ''

   const formatter = {
    day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    month: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
   }

  const univToggle = (setState) => {
    setState(prev => !prev)
  }

  const updateHeadlineTodoVal = (e) => {
    setTodoData(prev => {
      return {
        ...prev,
        headline: e.target.value
      }
    })
  }

  const updateHeadlineGroupVal = (e) => {
    setGroupData(prev => {
      return {
        ...prev,
        headline: e.target.value
      }
    })
  }
  
  const updateShortDescVal = (e) => {
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

  const closeCreateGroup = () => {
    setIsCreateGroupOpen(false)
  }

  const changeTodoColor = (color) => {
    setTodoData(prev => {
      return {
        ...prev,
        color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
      }
    })
  }
  const changeGroupColor = (color) => {
    setGroupData(prev => {
      return {
        ...prev,
        color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
      }
    })
  }

  const allTodosOnClick = () => {
    setTodos(prev => {
      return [
        ...prev,
        {
          headline: todoData.headline === '' ? 'Task Name' : todoData.headline,
          shortDesc: todoData.shortDesc,
          color: todoData.color,
          priority: todoData.priority === '' ? 4 : todoData.priority,
        }
      ]
    })
    setTodoData({
      headline: '',
      shortDesc: '',
      color: '#333',
      priority: ''
    })
    setIsCreateTodoOpen(false)
    console.log(todos);
  }

  const allGroupsOnClick = () => {
    setGroups(prev => {
      return [
        ...prev,
        {
          headline: groupData.headline === '' ? 'Group Name' : groupData.headline,
          color: groupData.color,
        }
      ]
    })
    setGroupData({
      headline: '',
      color: '#333',
    })
    setIsCreateGroupOpen(false)
    console.log(groups);
  }

  const selectGroup = (group) => {
    console.log(group.headline)
  }

  const formatDate = (dayType, day, month, year) => {
    let dayFormatted
    let monthFormatted
    for (let i = 0; i < 7; i++) {
      if (dayType === i) {
        dayFormatted = formatter.day[i]
      } 
    }
    for (let i = 1; i <= 12; i++) {
      if (month === i) {
        monthFormatted = formatter.month[i - 1]      
      }
    }
    setSelectedDate(prev => {
      return {
        ...prev,
        dayNum: day,
        dayName: dayFormatted,
        monthNum: month,
        monthName: monthFormatted,
        year: year
      }
    })        
  }

  useEffect(() => {
    formatDate(now.getDay(), now.getDate(), now.getMonth() + 1, now.getFullYear())
  }, [])
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
              <Calendar
                style = {isCalendarOpen ? { display: "block" } : { display: "none" }}
                className={`calendar ${isCalendarOpen ? "calendarShown" :  "calendarHidden"} `}
                onClickDay={
                  (value) => {
                    const day = value.getDate()
                    const month = value.getMonth() + 1 
                    const year = value.getFullYear()
                    formatDate(value.getDay(), day, month, year)
                    setIsCalendarOpen(false)
                    // console.log(`Day: ${day} Month: ${month} Year: ${year}`)
                }
              }
              minDate={new Date}
              maxDate={new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())}
              />
              <div className="dayTimeCont">
                <div
                  className={`h2Cont ${isCalendarOpen ? "rotate" : "goBack"}`}
                  onClick={() => univToggle(setIsCalendarOpen)}
                >
                  <h2>
                    {selectedDate.dayNum === now.getDate() + 1 && selectedDate.monthNum === now.getMonth() + 1 ? 'Tommorrow' : selectedDate.dayNum === now.getDate() && selectedDate.monthNum === now.getMonth() + 1 ? 'Today' : selectedDate.dayName }
                    </h2>
                </div>
                <h4>{selectedDate.dayNum} {selectedDate.monthName}. {selectedDate.year}</h4>
              </div>
              <div className="ctaCont" style={{position: "relative"}}>
                <p onClick={() => univToggle(setIsCreateGroupOpen)} className="ctaGroupTodo">Create Group</p>
                <div style={isCreateGroupOpen ? {display: "block"} : {display: "none"}} className="createToDo createToDo2 createGroup">
                  <div className="topInputCont">
                    <div className="imgAndInputCont">
                      <img onClick={() => univToggle(setIsPalletteGroupOpen)} src={pallette} alt="" />
                      <input value={groupData.headline} onChange={updateHeadlineGroupVal} style={{color: groupData.color === '#333' ? null : groupData.color}} className="headline" placeholder="Group Name..." type="text" maxLength={15} />
                    </div>
                  <ChromePicker
                    color={groupData.color}
                    onChange={changeGroupColor}
                    className={isPalletteGroupOpen ? 'palletteOpen' : 'palletteClose' }
                  />
                  </div>
                  <div className="bottomBtnCont">
                    <div className="rightBtnCont">
                      <div onClick={closeCreateGroup} className="closeBtn">Close</div>
                      <div onClick={allGroupsOnClick} className="submitBtn">Submit</div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="ctaCont secondCtaCont" style={{position: "relative"}}>
              <div onClick={() => univToggle(setIsGroupAddOpen)} className="ctaGroupTodo leftCtaGroupTodo">Add Group</div>
              <ul className="dropdownGroup" style={{display: isGroupAddOpen ? 'block' : 'none'}}>
                {groups.map((group, index) => {
                  return(
                    <li onClick={() => selectGroup(group)} key={index} style={{color: group.color === '#333' ? 'rgba(51, 51, 51, 0.8)' : group.color}} ><p>{group.headline}</p></li>
                  )
                })}
              </ul>
            </div>
            
            <div className="groupCont">
              <h2 className="groupHeadline">General</h2>
              <div className="toDoListItemsCont">
                <h2 onClick={() => univToggle(setIsCreateTodoOpen)} className="ctaGroupTodo leftCtaGroupTodo">Add To-Do</h2>
                <div style={isCreateTodoOpen ? {display: "block"} : {display: "none"}} className="createToDo">
                  <div className="topInputCont">
                    <div className="imgAndInputCont">
                      <img onClick={() => univToggle(setIsPalletteOpen)} src={pallette} alt="" />
                      <input value={todoData.headline} onChange={updateHeadlineTodoVal} style={{color: todoData.color === '#333' ? null : todoData.color}} className="headline" placeholder="Task Name..." type="text" maxLength={30} />
                    </div>
                    <input value={todoData.shortDesc} onChange={updateShortDescVal} className="shortDesc" placeholder="Short Description" type="text" maxLength={50} />
                  <ChromePicker
                    color={todoData.color}
                    onChange={changeTodoColor}
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
                      <div onClick={allTodosOnClick} className="submitBtn">Submit</div>
                    </div>
                  </div>
                </div>
                {todos.map(todo => {
                  const prioCircleHoverTernary = todo.priority === 1 ? 'prio1'
                  : todo.priority === 2 ? 'prio2'
                  : todo.priority === 3 ? 'prio3'
                  : todo.priority === 4 ? 'prio4' : ''

                  const prioCircleStyleTernary = todo.priority === 1 ? prioCircleStyles.prio1
                  : todo.priority === 2 ? prioCircleStyles.prio2
                  : todo.priority === 3 ? prioCircleStyles.prio3
                  : todo.priority === 4 ? prioCircleStyles.prio4 : ''

                  return <ToDoListItem
                  key={Math.random}
                  name={todo.headline}
                  priorityCircleSx={prioCircleStyleTernary}
                  priorityCircleHoverClass={prioCircleHoverTernary}
                  headlineColor={todo.color}
                  />
                })}
              </div>
            </div>
            <div className="groupCont">
              <h2 className="groupHeadline">Banger</h2>
              <div className="toDoListItemsCont">
                <ToDoListItem
                  name='Do The Dishes asdfasfsdafsdasdfasdfasfdfsd'
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
