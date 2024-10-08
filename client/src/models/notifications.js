import axios from "axios";

export const createNotifications = async (userId, data) => {
    const res = await axios.post(`http://localhost:3000/api/v1/notifications/${userId}`, data)
      return notificationsPayload(res)
}

export const createNotesNotification = async (userId) => {
    const res = await axios.post(`http://localhost:3000/api/v1/notifications/notes/${userId}`)
      return extendedNotificationsPayload(res)
}

export const createTodoNotification = async (userId) => {
    const res = await axios.post(`http://localhost:3000/api/v1/notifications/todos/${userId}`)
      return extendedNotificationsPayload(res)
}

export const createPomodoroNotification = async (userId) => {
    const res = await axios.post(`http://localhost:3000/api/v1/notifications/pomodoro/${userId}`)
      return extendedNotificationsPayload(res)
}

export const getNotificationsById = async (userId) => {
    const res = await axios.get(`http://localhost:3000/api/v1/notifications/${userId}`)
      return notificationsPayload(res)
}

export const patchNotification = async (id, data) => {
    const res = await axios.patch(`http://localhost:3000/api/v1/notifications/${id}`, data)
      return notificationsPayload(res)
}

const notificationsPayload = (res) => {
    return {
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status,
    }
}

const extendedNotificationsPayload = (res) => {
    return {
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status,
        isNotificationRead: res.data.isNotificationRead
    }
}