import axios from "axios";

export const createTodoPage = async (userId, data) => {
    const res = await axios.post(`http://localhost:3000/api/v1/todoPages/${userId}`, {
        dayNum: data.dayNum,
        dayName: data.dayName,
        monthNum: data.monthNum,
        monthName: data.monthName,
        year: data.year
    })
    return todoPagePayload(res)
}

const todoPagePayload = (res) => {
    return {
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status
    }
}