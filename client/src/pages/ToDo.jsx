/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/TopMenu";
import { ChromePicker } from "react-color";
import { convertToHSLDark, formatDate } from "../functions/functions";
import pallette from "../assets/icons/Pallette.svg";

import "../styles/styles.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
  createTodoPage,
  deleteOldTodoPages,
  getTodoPage,
} from "../models/todoPage";
import { createGroup, deleteGroup, getAllGroups, patchGroup } from "../models/groups";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import GroupCont from "../components/GroupCont";
import greenCheckFill from "../assets/icons/greenCheckFill.svg";
import bin from "../assets/icons/Bin.svg";

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

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isGroupAddOpen, setIsGroupAddOpen] = useState(false);
  const [isPalletteGroupOpen, setIsPalletteGroupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    dayNum: null,
    dayName: null,
    monthNum: null,
    monthName: null,
    year: null,
  });

  const now = new Date();

  const auth = useAuthUser();

  let navigate = useNavigate();

  const { todoPageId } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);

  const [groupData, setGroupData] = useState({
    name: "",
    color: '',
  });

  const [groups, setGroups] = useState([]);

  // if (isBlack) {
  //   setGroupData(prev => {
  //     return {
  //       ...prev,
  //       color: "#FFF"
  //     }
  //   })
  // }

  const loadTodoPages = async () => {
    const todoPage = await getTodoPage(auth.id ,todoPageId);
    if (todoPage.status === 500) return setIsLoaded(false);
    if (todoPage.status === 200) {
      setSelectedDate(todoPage.data);
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    }
  };

  const closeAll = () => {
    setIsPalletteGroupOpen(false);
    // setIsPalletteOpen(false);
    setIsGroupAddOpen(false);
    setIsCreateGroupOpen(false);
    // setIsCreateTodoOpen(false);
    // setIsPrioOpen(false)
    setIsCalendarOpen(false);
  };

  const loadGroups = async () => {
    const groups = await getAllGroups(todoPageId);
    if (groups.status === 500) {
      setIsLoaded(false);
      console.log(groups.msg);
    }
    if (groups.status === 200) {
      setGroups(groups.data);
    }
    if (groups.status === 204) {
      setGroups([]);
    }
  };

  const deletedGroup = async (id) => {
    await deleteGroup(id)
    loadGroups()
  }

  const loadDeleted = async () => {
    const todoPage = await deleteOldTodoPages(auth.id);
    if (todoPage.status === 200) {
      console.log(todoPage.msg);
    }
  };

  const univToggle = (setState) => {
    setState((prev) => !prev);
  };

  const updateHeadlineGroupVal = (e) => {
    setGroupData((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  };

  const closeCreateGroup = () => {
    setIsCreateGroupOpen(false);
  };

  const changeGroupColor = (color) => {
    setGroupData((prev) => {
      return {
        ...prev,
        color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      };
    });
  };

  const allGroupsOnClick = async () => {
    const group = await createGroup(todoPageId, {
      name: groupData.name === "" ? "Group Name" : groupData.name,
      color: groupData.color === "333" ? "#333" : groupData.color,
    }).catch((err) => console.log(err.response.data.msg));

    if (group.status === 201) {
      setGroups((prev) => {
        return [...prev, group.data];
      });
    }
    setGroupData({
      name: "",
      color: isBlack ? "#FFF" : "#333",
    });
    setIsCreateGroupOpen(false);
  };

  const selectGroup = async (group) => {
    await patchGroup(group.id, [
      {
        propName: "isSelected",
        value: !group.isSelected,
      },
    ]);
    loadGroups();
    setIsGroupAddOpen(false);
  };

  useEffect(() => {
    setSelectedDate(
      formatDate(
        now.getDay(),
        now.getDate(),
        now.getMonth() + 1,
        now.getFullYear()
      )
    );
    loadTodoPages();
    loadDeleted();
  }, []);

  useEffect(() => {
    loadGroups();
  }, [todoPageId]);

  useEffect(() => {
    if (groupData.color == '#333' || groupData.color == '#FFF' || !groupData.color) {
      setGroupData(prev => {
        return {
          ...prev,
          color: isBlack ? "#FFF" : "#333"
        }
      })
    }
  }, [isBlack, groupData.color])

  if (!isLoaded) {
    return (
      <>
        <LoadingPage />
      </>
    );
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
              <Calendar
                style={
                  isCalendarOpen ? { display: "block" } : { display: "none" }
                }
                className={`calendar ${
                  isCalendarOpen ? "calendarShown" : "calendarHidden"
                } `}
                onClickDay={async (value) => {
                  const day = value.getDate();
                  const month = value.getMonth() + 1;
                  const year = value.getFullYear();
                  setSelectedDate(formatDate(value.getDay(), day, month, year));
                  const todoPage = await createTodoPage(
                    auth.id,
                    formatDate(value.getDay(), day, month, year)
                  ).catch((err) => console.log(err.response.data.msg));

                  if (todoPage.status === 200 || todoPage.status === 201) {
                    console.log("created or exists");
                    navigate(`/todo/${todoPage.data.id}`);
                    closeAll();

                    if (todoPage.data.id != todoPageId) return setGroups([]);
                  }
                }}
                minDate={new Date()}
                maxDate={
                  new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
                }
              />
              <div className="dayTimeCont">
                <div
                  className={`h2Cont ${isCalendarOpen ? "rotate" : "goBack"}`}
                  onClick={() => univToggle(setIsCalendarOpen)}
                >
                  <h2>
                    {selectedDate.dayNum === now.getDate() + 1 &&
                    selectedDate.monthNum === now.getMonth() + 1
                      ? "Tommorrow"
                      : selectedDate.dayNum === now.getDate() &&
                        selectedDate.monthNum === now.getMonth() + 1
                      ? "Today"
                      : selectedDate.dayName}
                  </h2>
                </div>
                <h4>
                  {selectedDate.dayNum} {selectedDate.monthName}.{" "}
                  {selectedDate.year}
                </h4>
              </div>
              <div className="ctaCont" style={{ position: "relative" }}>
                <p
                  onClick={() => univToggle(setIsCreateGroupOpen)}
                  className="ctaGroupTodo"
                >
                  Create Group
                </p>
                <div
                  // style={
                  //   isCreateGroupOpen
                  //     ? { display: "block" }
                  //     : { display: "none" }
                  // }
                  style={{
                    display: isCreateGroupOpen ? "block" : "none",
                    backgroundColor: isBlack ? "#333" : "white"
                  }}
                  
                  className="createToDo createToDo2 createGroup"
                >
                  <div className="topInputCont">
                    <div className="imgAndInputCont">
                      <img
                        onClick={() => univToggle(setIsPalletteGroupOpen)}
                        src={pallette}
                        alt=""
                      />
                      <input
                        value={groupData.name}
                        onChange={updateHeadlineGroupVal}
                        style={{color: isBlack ? convertToHSLDark(groupData.color, false) : convertToHSLDark(groupData.color, true)}}
                        className="headline"
                        placeholder="Group Name..."
                        type="text"
                        maxLength={15}
                      />
                    </div>
                    <ChromePicker
                      color={groupData.color}
                      onChange={changeGroupColor}
                      className={`${
                        isPalletteGroupOpen ? "palletteOpen" : "palletteClose"
                      } groupChromePicker`}
                    />
                  </div>
                  <div className="bottomBtnCont">
                    <div className="rightBtnCont">
                      <div onClick={closeCreateGroup} className="closeBtn">
                        Close
                      </div>
                      <div onClick={allGroupsOnClick} className="submitBtn">
                        Submit
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="ctaCont secondCtaCont"
              style={{ position: "relative" }}
            >
              <div
                onClick={() => univToggle(setIsGroupAddOpen)}
                className="ctaGroupTodo leftCtaGroupTodo"
              >
                Add Group
              </div>
              <ul
                className="dropdownGroup"
                style={{ 
                  display: isGroupAddOpen ? "block" : "none",
                  backgroundColor: isBlack ? "#333" : "#FFF"
                 }}
              >
                {groups.map((group) => {
                  return (
                    <li
                      key={group.id}
                      style={{
                        color: isBlack ? convertToHSLDark(group.color, false) : convertToHSLDark(group.color, true),
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: '3rem'
                      }}
                    >
                      <div
                        className="leftCont"
                        onClick={() => selectGroup(group)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          width: "100%",
                          height: "100%",
                          paddingLeft: '1.5rem'
                        }}
                      >
                        {group.isSelected && (
                          <img
                            style={{ height: "1.25rem" }}
                            src={greenCheckFill}
                            alt=""
                          />
                        )}
                        <p className={isBlack ? 'blackHover' : ''}>
                          {group.name}
                          </p>
                      </div>
                      <div
                        className="rightCont"
                        style={{
                          height: "100%",
                          paddingRight: '1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={() => deletedGroup(group.id)}
                        >
                        <img
                          src={bin}
                          alt=""
                          style={{ height: "1.25rem" }}
                          className="bin"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {groups.map((group) => {
              if (group.isSelected) {
                return (
                  <GroupCont
                    univToggle={univToggle}
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    color={group.color}
                    isBlack={isBlack}
                  />
                );
              }
            })}

            {/* <GroupCont
              univToggle={univToggle}
            />
            
            <GroupCont
              univToggle={univToggle}
            /> */}

            {/* <div className="groupCont">
              <h2 className="groupHeadline">Banger</h2>
              <div className="toDoListItemsCont">
                <ToDoListItem
                  name="Do The Dishes asdfasfsdafsdasdfasdfasfdfsd"
                  priorityCircleSx={prioCircleStyles.prio4}
                  priorityCircleHoverClass="prio4"
                />
                <ToDoListItem
                  name="Meditate"
                  priorityCircleSx={prioCircleStyles.prio3}
                  priorityCircleHoverClass="prio3"
                />
                <ToDoListItem
                  name="Meditate"
                  priorityCircleSx={prioCircleStyles.prio2}
                  priorityCircleHoverClass="prio2"
                />
                <ToDoListItem
                  name="Meditate"
                  priorityCircleSx={prioCircleStyles.prio1}
                  priorityCircleHoverClass="prio1"
                />
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </>
  );
}

export default ToDo;
