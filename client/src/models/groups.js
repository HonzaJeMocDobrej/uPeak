import axios from "axios";

export const createGroup = async (pageId, data) => {
    const res = await axios.post(`http://localhost:3000/api/v1/groups/${pageId}`, {
        name: data.name,
        color: data.color,
    })
    return groupPayload(res)
}

export const getAllGroups = async (pageId) => {
    const res = await axios.get(`http://localhost:3000/api/v1/groups/${pageId}`)
    return groupPayload(res)
}

const groupPayload = (res) => {
    return {
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status
    }
}