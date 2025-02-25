import { Request, Response } from "express";
import db from "../../models";
import { formatFullDate } from "../todo/todoPages";

const Notifications = db.notifications
const Achievements = db.notifAchievements

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API endpoints for notifications
 */

/**
 * @swagger
 * /api/v1/notifications/{userId}/{id}:
 *   get:
 *     summary: Get the notification by user id and notification id
 *     description: Get the notification by user id and notification id
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the notification
 *     responses:
 *       200:
 *         description: The notification of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     value:
 *                       type: string
 *                     isShown:
 *                       type: boolean
 *                     page:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: Notifications not found
 *       500:
 *         description: Something went wrong
 */
export const getNotificationById = async (req: Request, res: Response) => {
    try {
        const { userId, id } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const notifications = await Notifications.findOne({where: {userId: userId, id: id }})
        if (!notifications || notifications.length == 0) return res.status(404).send({msg: 'Notifications not found'})
        return res.status(200).send({msg: 'Notification found', payload: notifications})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/notifications/{userId}:
 *   get:
 *     summary: Get the notifications of a user
 *     description: Returns the notifications of a user
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     responses:
 *       200:
 *         description: The notifications of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       value:
 *                         type: string
 *                       isShown:
 *                         type: boolean
 *                       page:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: Notifications not found
 *       500:
 *         description: Something went wrong
 */
export const getNotifications = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const notifications = await Notifications.findAll({where: {userId: userId, isShown: true}})
        if (!notifications || notifications.length == 0) return res.status(204).send({msg: 'Notifications not found'})
        return res.status(200).send({msg: 'Notifications found', payload: notifications})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/notifications/{userId}:
 *   post:
 *     summary: Create a notification for a user
 *     description: Creates a notification for a user
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *       - in: body
 *         name: Notification
 *         schema:
 *           type: object
 *           properties:
 *             value:
 *               type: string
 *             page:
 *               type: string
 *             isShown:
 *               type: boolean
 *     responses:
 *       201:
 *         description: Notification created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     value:
 *                       type: string
 *                     page:
 *                       type: string
 *                     isShown:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Missing details
 *       500:
 *         description: Something went wrong
 */
export const createNotifications = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const { value, page, isShown } = req.body
        if (!userId || !value || !page) return res.status(400).send({msg: 'Missing details'})
        const createdNotifications = await Notifications.create({
            userId: userId,
            value: value,
            page: page,
            isShown: isShown 
        })
        if (!createdNotifications) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(201).send({msg: 'Notification created', payload: createdNotifications})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}


/**
 * @swagger
 * /api/v1/notifications/notes/{userId}:
 *   post:
 *     summary: Create a notification for a user when they have created a certain number of notes
 *     description: Creates a notification for a user when they have created a certain number of notes
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     responses:
 *       201:
 *         description: Notification created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     value:
 *                       type: string
 *                     page:
 *                       type: string
 *                     isShown:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                 isNotificationRead:
 *                   type: boolean
 *       400:
 *         description: Missing details
 *       500:
 *         description: Something went wrong
 */
export const createNoteNotification = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const achievements = await Achievements.findOne({where: {userId: userId}})
        if (!achievements) return res.status(500).send({msg: 'Something went wrong'})
        if (achievements.notesCreatedCount % 10 != 0) return res.status(204).send({msg: 'Not enough created notes'}) 
        const createdNotifications = await Notifications.create({
            userId: userId,
            value: `Congrats for <span class='notificSpan'>${achievements.notesCreatedCount}</span> created notes`,
            page: 'Notes',
            isShown: true 
        })
        if (!createdNotifications) return res.status(500).send({msg: 'Something went wrong'})
        achievements.isNotificationRead = false
        const action = await achievements.save()
        if (!action) return res.status(500).send('Something went wrong')
        return res.status(201).send({msg: 'Notification created', payload: createdNotifications, isNotificationRead: achievements.isNotificationRead})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}


/**
 * @swagger
 * /api/v1/notifications/todos/{userId}:
 *   post:
 *     summary: Create a notification for a user when they have created a certain number of todos
 *     description: Creates a notification for a user when they have created a certain number of todos
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     responses:
 *       201:
 *         description: Notification created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     value:
 *                       type: string
 *                     page:
 *                       type: string
 *                     isShown:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                 isNotificationRead:
 *                   type: boolean
 *       400:
 *         description: Missing details
 *       500:
 *         description: Something went wrong
 */
export const createTodoNotification = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const achievements = await Achievements.findOne({where: {userId: userId}})
        if (!achievements) return res.status(500).send({msg: 'Something went wrong'})
        if (achievements.todosCreatedCount % 20 != 0) return res.status(204).send({msg: 'Not enough created todos'}) 
        const createdNotifications = await Notifications.create({
            userId: userId,
            value: `Congrats for <span class='notificSpan'>${achievements.todosCreatedCount}</span> created todos`,
            page: 'Todo',
            isShown: true 
        })
        if (!createdNotifications) return res.status(500).send({msg: 'Something went wrong'})
        achievements.isNotificationRead = false
        const action = await achievements.save()
        if (!action) return res.status(500).send('Something went wrong')
        return res.status(201).send({msg: 'Notification created', payload: createdNotifications, isNotificationRead: achievements.isNotificationRead})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/notifications/pomodoro/{userId}:
 *   post:
 *     summary: Create a notification for a user when they have completed a certain number of Pomodoro sessions
 *     description: Creates a notification for a user when they have completed a certain number of Pomodoro sessions
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     responses:
 *       201:
 *         description: Notification created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     value:
 *                       type: string
 *                     page:
 *                       type: string
 *                     isShown:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                 isNotificationRead:
 *                   type: boolean
 *       400:
 *         description: Missing details
 *       500:
 *         description: Something went wrong
 */
export const createPomodoroNotification = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const achievements = await Achievements.findOne({where: {userId: userId}})
        if (!achievements) return res.status(500).send({msg: 'Something went wrong'})
        if (achievements.pomodoroWholeSessionsCount % 5 != 0) return res.status(204).send({msg: 'Not enough pomodoro sessinos'}) 
        const createdNotifications = await Notifications.create({
            userId: userId,
            value: `Congrats for <span class='notificSpan'>${achievements.pomodoroWholeSessionsCount}</span> completed Pomodoro sessions`,
            page: 'Pomodoro',
            isShown: true 
        })
        if (!createdNotifications) return res.status(500).send({msg: 'Something went wrong'})
        achievements.isNotificationRead = false
        const action = await achievements.save()
        if (!action) return res.status(500).send('Something went wrong')
        return res.status(201).send({msg: 'Notification created', payload: createdNotifications, isNotificationRead: achievements.isNotificationRead})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   patch:
 *     summary: Patch a notification by id
 *     description: Patch a notification by id
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 propName:
 *                   type: string
 *                 value:
 *                   type: string
 *     responses:
 *       200:
 *         description: Notification patched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     value:
 *                       type: string
 *                     page:
 *                       type: string
 *                     isShown:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Something went wrong
 */
export const patchNotificationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id || !data) return res.status(400).send({msg: 'Missing details'})
        const notification = await Notifications.findOne({where: {id: id}})
        if (!notification) return res.status(404).send({msg: 'Notification not found'})
        for (const ops of data) {
            notification[ops.propName] = ops.value
        }
        const action = await notification.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Notification patched', payload: notification})
    } catch (err) {
        res.status(500).send(err)
    }
}
