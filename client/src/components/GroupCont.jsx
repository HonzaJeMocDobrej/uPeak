/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

import ToDoListItem from './ToDoListItem';
import { createTodo, getTodosById } from '../models/todos';
import { nanoid } from 'nanoid'
import AddToDo from './AddToDo';

function GroupCont(props) {

    const { univToggle, name, color, id} = props

    const [todos, setTodos] = useState([]);
    const [isCreateTodoOpen, setIsCreateTodoOpen] = useState(false);

    const [todoData, setTodoData] = useState({
        name: "",
        shortDesc: "",
        color: "#333",
        priority: "",
        id: ""
      });

    const loadTodos = async () => {
      const todos = await getTodosById(id)
      if (todos.status === 200 || todos.status === 204) {
        console.log(todos.data)
        setTodos(todos.data)
      }
    }

      const allTodosOnClick = async () => {
        const createdTodo = await createTodo(id, {
          name: todoData.name === "" ? "Task Name" : todoData.name,
          shortDesc: todoData.shortDesc,
          color: todoData.color,
          priority: todoData.priority === "" ? 4 : todoData.priority,
        })
        if (createdTodo.status === 201 && todos) {
            setTodos((prev) => {
              return [...prev, {
                name: todoData.name === "" ? "Task Name" : todoData.name,
                shortDesc: todoData.shortDesc,
                color: todoData.color,
                priority: todoData.priority === "" ? 4 : todoData.priority,
                id: nanoid()
              }];
            });
        }
        
        setTodoData({
          name: "",
          shortDesc: "",
          color: "#333",
          priority: "",
          id: ""
        });
        setIsCreateTodoOpen(false);
        loadTodos()
        console.log(todos);
      };

      const prioCircleStyles = {
        prio1: { border: "solid 2px #F00", backgroundColor: "#FFE5E5" },
        prio2: { border: "solid 1.5px #00B232", backgroundColor: "#E5FFED" },
        prio3: { border: "solid 1px #09F", backgroundColor: "#E5F5FF" },
        prio4: { border: "solid 0.5px #ADADAD" },
      };

      useEffect(() => {
        loadTodos()
      }, [])
      

  return (
    <>
        <div className="groupCont">
              <h2 className="groupHeadline" style={{color: color}}>{name}</h2>
              <div className="toDoListItemsCont">
              {
            todos && todos.map((todo) => {
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
                      key={todo.id}
                      id={todo.id}
                      loadTodos={loadTodos}
                      name={todo.name}
                      priorityCircleSx={prioCircleStyleTernary}
                      priorityCircleHoverClass={prioCircleHoverTernary}
                      headlineColor={todo.color}
                      univToggle={univToggle}
                    />
                  );
                })}
                <h2
                  onClick={() => univToggle(setIsCreateTodoOpen)}
                  className="ctaGroupTodo leftCtaGroupTodo"
                >
                  Add To-Do
                </h2>
                
                <AddToDo
                  todoData={todoData}
                  setTodoData={setTodoData}
                  isCreateTodoOpen={isCreateTodoOpen}
                  setIsCreateTodoOpen={setIsCreateTodoOpen}
                  univToggle={univToggle}
                  submitFunc={allTodosOnClick}
                />
                
              </div>
            </div>
    </>
  )
}

export default GroupCont