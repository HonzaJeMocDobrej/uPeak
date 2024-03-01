/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ChromePicker } from "react-color";


import pallette from "../assets/icons/Pallette.svg";
import priorityLightningFour from "../assets/icons/priorityLightningFour.svg";
import priorityLightningThree from "../assets/icons/priorityLightningThree.svg";
import priorityLightningTwo from "../assets/icons/priorityLightningTwo.svg";
import priorityLightningOne from "../assets/icons/priorityLightningOne.svg";

function AddToDo(props) {

    const {todoData, setTodoData, isCreateTodoOpen, setIsCreateTodoOpen, univToggle, submitFunc, style, closeData, isBlack, darkColor, lightColor} = props

    const [isPalletteOpen, setIsPalletteOpen] = useState(false);
    const [isPrioOpen, setIsPrioOpen] = useState(false);

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

      const closeCreateTodo = () => {
        setIsCreateTodoOpen(false);
        if (!closeData) return
        setTodoData({
          name: "",
          shortDesc: "",
          color: "",
          priority: "",
          id: ""
        });
      };

      const updateShortDescVal = (e) => {
        setTodoData((prev) => {
          return {
            ...prev,
            shortDesc: e.target.value,
          };
        });
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
            name: e.target.value,
          };
        });
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

      useEffect(() => {
        if (todoData.color == '#333' || todoData.color == '#FFF' || !todoData.color) {
          setTodoData(prev => {
            return {
              ...prev,
              color: isBlack ? "#FFF" : "#333"
            }
          })
        }
      }, [isBlack, todoData.color])

  return (
    <>
      <div
        // style={isCreateTodoOpen ? { display: "block" } : { display: "none" }}
        style={{display: isCreateTodoOpen ? "block" : "none", top: style, backgroundColor: isBlack ? '#333' : '#FFF'}}
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
              value={todoData.name}
              onChange={updateHeadlineTodoVal}
              style={{ color: isBlack ? darkColor : lightColor }}
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
            style={isPrioOpen ? { display: "flex" } : { display: "none" }}
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
            <div onClick={submitFunc} className="submitBtn">
              Submit
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddToDo;
