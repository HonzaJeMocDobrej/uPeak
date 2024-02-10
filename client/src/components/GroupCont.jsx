/* eslint-disable react/prop-types */
import { useState } from 'react'
import { ChromePicker } from "react-color";


import pallette from "../assets/icons/Pallette.svg";
import priorityLightningFour from "../assets/icons/priorityLightningFour.svg";
import priorityLightningThree from "../assets/icons/priorityLightningThree.svg";
import priorityLightningTwo from "../assets/icons/priorityLightningTwo.svg";
import priorityLightningOne from "../assets/icons/priorityLightningOne.svg";
import ToDoListItem from './ToDoListItem';

function GroupCont(props) {

    const { univToggle, name, color} = props

    const [isCreateTodoOpen, setIsCreateTodoOpen] = useState(false);
    const [isPalletteOpen, setIsPalletteOpen] = useState(false);
    const [isPrioOpen, setIsPrioOpen] = useState(false);

    const [todos, setTodos] = useState([]);

    const [todoData, setTodoData] = useState({
        headline: "",
        shortDesc: "",
        color: "#333",
        priority: "",
      });

    const closeCreateTodo = () => {
        setTodoData({
          headline: "",
          shortDesc: "",
          color: "#333",
          priority: "",
        });
        setIsCreateTodoOpen(false);
      };

      const allTodosOnClick = () => {
        setTodos((prev) => {
          return [
            ...prev,
            {
              headline: todoData.headline === "" ? "Task Name" : todoData.headline,
              shortDesc: todoData.shortDesc,
              color: todoData.color,
              priority: todoData.priority === "" ? 4 : todoData.priority,
            },
          ];
        });
        setTodoData({
          headline: "",
          shortDesc: "",
          color: "#333",
          priority: "",
        });
        setIsCreateTodoOpen(false);
        console.log(todos);
      };

    const prioImgTernary =
    todoData.priority === 1
      ? "lightPrio1"
      : todoData.priority === 2
      ? "lightPrio2"
      : todoData.priority === 3
      ? "lightPrio3"
      : todoData.priority === 4
      ? "lightPrio4"
      : "";


    const updateShortDescVal = (e) => {
        setTodoData((prev) => {
          return {
            ...prev,
            shortDesc: e.target.value,
          };
        });
      };

      const updatePrioVal = (prio) => {
        setTodoData((prev) => {
          return {
            ...prev,
            priority: prio,
          };
        });
        setIsPrioOpen((prev) => !prev);
        console.log(todoData);
      };

      const changeTodoColor = (color) => {
        setTodoData((prev) => {
          return {
            ...prev,
            color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
          };
        });
      };

      const updateHeadlineTodoVal = (e) => {
        setTodoData((prev) => {
          return {
            ...prev,
            headline: e.target.value,
          };
        });
      };

      const prioCircleStyles = {
        prio1: { border: "solid 2px #F00", backgroundColor: "#FFE5E5" },
        prio2: { border: "solid 1.5px #00B232", backgroundColor: "#E5FFED" },
        prio3: { border: "solid 1px #09F", backgroundColor: "#E5F5FF" },
        prio4: { border: "solid 0.5px #ADADAD" },
      };

  return (
    <>
        <div className="groupCont">
              <h2 className="groupHeadline" style={{color: color}}>{name}</h2>
              <div className="toDoListItemsCont">
              {todos.map((todo) => {
                  const prioCircleHoverTernary =
                    todo.priority === 1
                      ? "prio1"
                      : todo.priority === 2
                      ? "prio2"
                      : todo.priority === 3
                      ? "prio3"
                      : todo.priority === 4
                      ? "prio4"
                      : "";

                  const prioCircleStyleTernary =
                    todo.priority === 1
                      ? prioCircleStyles.prio1
                      : todo.priority === 2
                      ? prioCircleStyles.prio2
                      : todo.priority === 3
                      ? prioCircleStyles.prio3
                      : todo.priority === 4
                      ? prioCircleStyles.prio4
                      : "";

                  return (
                    <ToDoListItem
                      key={Math.random}
                      name={todo.headline}
                      priorityCircleSx={prioCircleStyleTernary}
                      priorityCircleHoverClass={prioCircleHoverTernary}
                      headlineColor={todo.color}
                    />
                  );
                })}
                <h2
                  onClick={() => univToggle(setIsCreateTodoOpen)}
                  className="ctaGroupTodo leftCtaGroupTodo"
                >
                  Add To-Do
                </h2>
                <div
                  style={
                    isCreateTodoOpen
                      ? { display: "block" }
                      : { display: "none" }
                  }
                  className="createToDo"
                >
                  <div className="topInputCont">
                    <div className="imgAndInputCont">
                      <img
                        onClick={() => univToggle(setIsPalletteOpen)}
                        src={pallette}
                        alt=""
                      />
                      <input
                        value={todoData.headline}
                        onChange={updateHeadlineTodoVal}
                        style={{
                          color:
                            todoData.color === "#333" ? null : todoData.color,
                        }}
                        className="headline"
                        placeholder="Task Name..."
                        type="text"
                        maxLength={30}
                      />
                    </div>
                    <input
                      value={todoData.shortDesc}
                      onChange={updateShortDescVal}
                      className="shortDesc"
                      placeholder="Short Description"
                      type="text"
                      maxLength={50}
                    />
                    <ChromePicker
                      color={todoData.color}
                      onChange={changeTodoColor}
                      className={`${
                        isPalletteOpen ? "palletteOpen" : "palletteClose"
                      } todoChromePicker`}
                    />
                  </div>
                  <div className="bottomBtnCont">
                    <div
                      onClick={() => univToggle(setIsPrioOpen)}
                      className={`prioBtn ${prioImgTernary}`}
                    >
                      Priority
                    </div>
                    <ul
                      style={
                        isPrioOpen ? { display: "flex" } : { display: "none" }
                      }
                      className="prioDropdown"
                    >
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
                      <div onClick={closeCreateTodo} className="closeBtn">
                        Close
                      </div>
                      <div onClick={allTodosOnClick} className="submitBtn">
                        Submit
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
    </>
  )
}

export default GroupCont