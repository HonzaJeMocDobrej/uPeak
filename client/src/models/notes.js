import axios from "axios";

export const createNotes = async (userId) => {
    const res = await axios.post(`http://localhost:3000/api/v1/notes/${userId}`)
    return notesPayload(res)
}

export const patchNote = async (id, data) => {
    const res = await axios.patch(`http://localhost:3000/api/v1/note/${id}`, data)
    return notesPayload(res)
}

export const getNote = async (id) => {
    const res = await axios.get(`http://localhost:3000/api/v1/note/${id}`)
    return notesPayload(res)
}

export const getNotes = async (userId) => {
    const res = await axios.get(`http://localhost:3000/api/v1/notes/${userId}`)
    return notesPayload(res)
}

const notesPayload = (res) => {
    return {
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status
    }
}