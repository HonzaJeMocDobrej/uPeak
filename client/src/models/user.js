import axios from "axios"

export const createUser = async (regData) => {
    const res = await axios.post('http://localhost:3000/api/v1/users', {
        username: regData.user,
        password: regData.pass,
        email: regData.email
      })
      return createUserPayload(res)
}

export const patchImage = async (id) => {
    const res = await axios.patch(`http://localhost:3000/api/v1/users/patchimg/${id}`)
      return createUserPayload(res)
}

const createUserPayload =  (res) => {
    return{
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status,
    }
}