/* eslint-disable react/prop-types */
import Bin from "../assets/icons/Bin.svg";
import { deleteTodoById, getTodoById, submitTodoById, updateTodoById } from "../models/todos";
import AddToDo from "./AddToDo";
import { useState } from "react";

function ToDoListItem(props) {
  const { id, loadTodos, univToggle } = props;

  const [isCreateTodoOpen, setIsCreateTodoOpen] = useState(false);
  const [ownTodoData, setOwnTodoData] = useState({
    name: "",
    shortDesc: "",
    color: "#333",
    priority: "",
    id: "",
  });

  const deleteTodo = async () => {
    await deleteTodoById(id);
    loadTodos();
  };

  const submitTodo = async () => {
    await submitTodoById(id);
    loadTodos();
  };

  const loadTodo = async () => {
    const todo = await getTodoById(id);
    if (todo.status === 200) setOwnTodoData(todo.data);
  };

  const updateTodo = async () => {
    const createdTodo = await updateTodoById(id, {
      name: ownTodoData.name === "" ? "Task Name" : ownTodoData.name,
      shortDesc: ownTodoData.shortDesc,
      color: ownTodoData.color,
      priority: ownTodoData.priority === "" ? 4 : ownTodoData.priority,
    })
    .catch(err => console.log(err.response.data))
    if (createdTodo.status === 200) {
        // setTodos((prev) => {
        //   return [...prev, {
        //     name: ownTodoData.name === "" ? "Task Name" : ownTodoData.name,
        //     shortDesc: ownTodoData.shortDesc,
        //     color: ownTodoData.color,
        //     priority: ownTodoData.priority === "" ? 4 : ownTodoData.priority,
        //     id: nanoid()
        //   }];
        // });
        setOwnTodoData(createdTodo.data);
    }
    
    setIsCreateTodoOpen(false);
    loadTodos()
  };

  const toggleTodoOpen = () => {
    loadTodo();
    setIsCreateTodoOpen((prev) => !prev);
  };

  return (
    <>
      <div className="todoAndAddTodoCont" style={{ position: "relative" }}>
        <AddToDo
          todoData={ownTodoData}
          setTodoData={setOwnTodoData}
          isCreateTodoOpen={isCreateTodoOpen}
          setIsCreateTodoOpen={setIsCreateTodoOpen}
          univToggle={univToggle}
          submitFunc={updateTodo}
          style={"3rem"}
          closeData={false}
        />
        <div className="toDoListItem">
          <div className="btnAndTextCont">
            <div
              onClick={submitTodo}
              style={props.priorityCircleSx}
              className={`priorityCircle ${props.priorityCircleHoverClass}`}
            ></div>
            <div
              className="onClickCont"
              onClick={toggleTodoOpen}
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                display: "flex",
                cursor: "pointer"
              }}
            >
              <p style={{ color: props.headlineColor }}>{props.name}</p>
            </div>
          </div>
          <div className="rightBtnsCont">
            <img onClick={deleteTodo} src={Bin} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDoListItem;
