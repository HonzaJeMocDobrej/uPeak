import axios from 'axios'

export const createStats = async (userId) => {
    const res = await axios.post(`http://localhost:3000/api/v1/stats/${userId}`)
      return statsPayload(res)
}

export const patchStats = async (userId, data) => {
    const res = await axios.patch(`http://localhost:3000/api/v1/stats/${userId}`, data)
      return statsPayload(res)
}

export const getUserStats = async (userId) => {
    const res = await axios.get(`http://localhost:3000/api/v1/stats/${userId}`)
    return statsPayload(res)
}

const statsPayload =  (res) => {
    return{
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status,
    }
}