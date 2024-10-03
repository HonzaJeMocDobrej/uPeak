import axios from 'axios'

export const createAchievements = async (userId, data) => {
    const res = await axios.post(`http://localhost:3000/api/v1/achievements/${userId}`, data)
      return achievementsPayload(res)
}

export const patchAchievements = async (userId, data) => {
    const res = await axios.patch(`http://localhost:3000/api/v1/achievements/${userId}`, data)
      return achievementsPayload(res)
}

export const addAchievementsCount = async (userId, data) => {
    const res = await axios.patch(`http://localhost:3000/api/v1/achievements/count/${userId}`, data)
    return achievementsPayload(res)
}

export const getUserAchievements = async (userId) => {
    const res = await axios.get(`http://localhost:3000/api/v1/achievements/${userId}`)
    return achievementsPayload(res)
}

const achievementsPayload =  (res) => {
    return{
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status,
    }
}