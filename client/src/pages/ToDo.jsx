/* eslint-disable react/prop-types */
import { useState } from "react";
import LeftMenu from "../components/LeftMenu";
import TopMenu from "../components/topMenu";

import "../styles/styles.css";

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

  const [isDayOpen, setIsDayOpen] = useState(false);
  const [day, setDay] = useState("Today");

  const toggleDropdownPage = () => {
    setIsDayOpen((prev) => !prev);
  };

  const selectDay = (day) => {
    setDay(day);
  };

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
            <h2 className="groupHeadline">General</h2>
            <h2 className="ctaGroupTodo leftCtaGroupTodo">Add To-Do</h2>
          </div>
        </main>
      </div>
    </>
  );
}

export default ToDo;
