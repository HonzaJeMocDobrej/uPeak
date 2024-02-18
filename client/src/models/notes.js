import axios from "axios";

export const createNotes = async (userId) => {
    const res = await axios.post(`http://localhost:3000/api/v1/notes/${userId}`)
    return notesPayload(res)
}

export const patchNote = async (id, data) => {
    const res = await axios.patch(`http://localhost:3000/api/v1/note/${id}`, data)
    return notePayload(res)
}

export const getNote = async (id) => {
    const res = await axios.get(`http://localhost:3000/api/v1/note/${id}`)
    return notePayload(res)
}

export const getNotes = async (userId) => {
    const res = await axios.get(`http://localhost:3000/api/v1/notes/${userId}`)
    return notePayload(res)
}

export const patchNoteImg = async (id, data) => {
    const res = await axios.patch(`http://localhost:3000/api/v1/note/img/${id}`, data)
      return notePayload(res)
}

export const getTheFirstNote = async (userId) => {
    const res = await axios.get(`http://localhost:3000/api/v1/notes/first/${userId}`)
    return notePayload(res)
}

export const deleteNote = async (userId, id) => {
    const res = await axios.delete(`http://localhost:3000/api/v1/note/${userId}/${id}`)
    return notePayload(res)
}

const notePayload = (res) => {
    return {
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status,
    }
}

const notesPayload = (res) => {
    return {
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status,
        notes: res.data.notes
    }
}