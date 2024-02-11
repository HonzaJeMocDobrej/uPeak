import axios from "axios";

export const createTodo = async (groupId, data) => {
    const res = await axios.post(`http://localhost:3000/api/v1/todos/${groupId}`, data)
    return todoPayload(res)
}

export const getTodosById = async (groupId) => {
    const res = await axios.get(`http://localhost:3000/api/v1/todos/${groupId}`)
    return todoPayload(res)
}

export const getTodoById = async (id) => {
    const res = await axios.get(`http://localhost:3000/api/v1/todo/${id}`)
    return todoPayload(res)
}

export const updateTodoById = async (id, data) => {
    const res = await axios.put(`http://localhost:3000/api/v1/todo/${id}`, data)
    return todoPayload(res)
}

export const deleteTodoById = async (id) => {
    const res = await axios.delete(`http://localhost:3000/api/v1/todo/${id}`)
    return todoPayload(res)
}

export const submitTodoById = async (id) => {
    const res = await axios.delete(`http://localhost:3000/api/v1/todo/submit/${id}`)
    return todoPayload(res)
}

const todoPayload = (res) => {
    return {
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status
    }
}