import axios from "axios"

export const createUser = async (regData) => {
    const res = await axios.post('http://localhost:3000/api/v1/users', {
        username: regData.user,
        password: regData.pass,
        email: regData.email
      })
      return tokenUserPayload(res)
}

export const updateUser = async (id, data) => {
    const res = await axios.patch(`http://localhost:3000/api/v1/users/${id}`, data)
    return tokenUserPayload(res)
}

export const updateUserPassword = async (id, data) => {
    const res = await axios.patch(`http://localhost:3000/api/v1/users/${id}/password`, data)
    return tokenUserPayload(res)
}

export const comparePasswords = async (logData) => {
    const res = await axios.post('http://localhost:3000/api/v1/users/compare', {
        email: logData.email,
        password: logData.pass
      })
      return tokenUserPayload(res)
}

export const patchImage = async (email, data) => {
    const res = await axios.patch(`http://localhost:3000/api/v1/users/patchimg/${email}`, data)
      return profilePicPayload(res)
}

const profilePicPayload =  (res) => {
    return{
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status,
        token: res.data.token,
        profilePic: res.data.profilePic
    }
}

const userPayload =  (res) => {
    return{
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status,
    }
}

const tokenUserPayload =  (res) => {
    return{
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status,
        token: res.data.token
    }
}