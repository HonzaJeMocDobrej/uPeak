import axios from "axios";

export const createTodo = async (groupId, data) => {
    const res = await axios.post(`http://localhost:3000/api/v1/todos/${groupId}`, data)
    return todoPayload(res)
}

export const getTodosById = async (groupId) => {
    const res = await axios.get(`http://localhost:3000/api/v1/todos/${groupId}`)
    return todoPayload(res)
}

const todoPayload = (res) => {
    return {
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status
    }
}