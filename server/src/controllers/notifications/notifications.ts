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
        const notifications = await Notifications.findAll({where: {userId: userId, isShown: true}})
        if (!notifications || notifications.length == 0) return res.status(204).send({msg: 'Notifications not found'})
        return res.status(200).send({msg: 'Notifications found', payload: notifications})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

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
