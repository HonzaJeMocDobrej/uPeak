import { Request, Response } from "express";
import db from "../../models";
import { formatFullDate } from "../todo/todoPages";

const Notifications = db.notifications

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

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const notifications = await Notifications.findAll({where: {userId: userId}})
        if (!notifications || notifications.length == 0) return res.status(404).send({msg: 'Notifications not found'})
        return res.status(200).send({msg: 'Notifications found', payload: notifications})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const createNotifications = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const { value } = req.body
        if (!userId || !value) return res.status(400).send({msg: 'Missing details'})
        const createdNotifications = await Notifications.create({
            userId: userId,
            value: value
        })
        if (!createdNotifications) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(201).send({msg: 'Notification created', payload: createdNotifications})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
