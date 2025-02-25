import { Request, Response } from "express";
import db from "../../models";
import { formatFullDate } from "../todo/todoPages";

const Stats = db.stats

/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: Stats API
 */

/**
 * @swagger
 * /api/v1/stats/{userId}:
 *   get:
 *     summary: Get the stats of a user
 *     description: Returns the stats of a user
 *     tags:
 *       - Stats
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     responses:
 *       200:
 *         description: The stats of the user
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
 *                     todoStart:
 *                       type: string
 *                     todoLastLogin:
 *                       type: string
 *                     notesStart:
 *                       type: string
 *                     notesLastLogin:
 *                       type: string
 *                     pomodoroStart:
 *                       type: string
 *                     pomodoroLastLogin:
 *                       type: string
 *                     todosCreatedCount:
 *                       type: number
 *                     notesCreatedCount:
 *                       type: number
 *                     pomodoroWholeSessionsCount:
 *                       type: number
 *                     isNotificationRead:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: Stats not found
 *       500:
 *         description: Something went wrong
 */
export const getStatsById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const stats = await Stats.findOne({where: {userId: userId}})
        if (!stats || stats.length == 0) return res.status(404).send({msg: 'Stats not found'})
        return res.status(200).send({msg: 'Stats found', payload: stats})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/stats/{userId}:
 *   post:
 *     summary: Create the stats of a user
 *     description: Creates the stats of a user
 *     tags:
 *       - Stats
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     responses:
 *       201:
 *         description: The stats of the user
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
 *                     userId:
 *                       type: string
 *                     todoStart:
 *                       type: string
 *                     todoLastLogin:
 *                       type: string
 *                     notesStart:
 *                       type: string
 *                     notesLastLogin:
 *                       type: string
 *                     pomodoroStart:
 *                       type: string
 *                     pomodoroLastLogin:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: Stats not found
 *       500:
 *         description: Something went wrong
 */
export const createStats = async (req: Request, res: Response) => {
    try {
        const nowDate: Date =  new Date()
        const { userId } = req.params
        console.log(userId)
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const stats = await Stats.findOne({where: {userId: userId}})
        if (stats) return res.status(400).send({msg: 'User already has stats'})
        const createdStats = await Stats.create({
            userId: userId,
            todoStart: formatFullDate(nowDate.getDate(), nowDate.getMonth() + 1, nowDate.getFullYear()),
            todoLastLogin: formatFullDate(nowDate.getDate(), nowDate.getMonth() + 1, nowDate.getFullYear()),
            notesStart: formatFullDate(nowDate.getDate(), nowDate.getMonth() + 1, nowDate.getFullYear()),
            notesLastLogin: formatFullDate(nowDate.getDate(), nowDate.getMonth() + 1, nowDate.getFullYear()),
            pomodoroStart: formatFullDate(nowDate.getDate(), nowDate.getMonth() + 1, nowDate.getFullYear()),
            pomodoroLastLogin: formatFullDate(nowDate.getDate(), nowDate.getMonth() + 1, nowDate.getFullYear()),
        })
        if (!createdStats) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(201).send({msg: 'Stats created', payload: createdStats})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/stats/{userId}:
 *   patch:
 *     summary: Patch the stats of a user
 *     description: Patches the stats of a user
 *     tags:
 *       - Stats
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
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
 *         description: Stats patched
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
 *                     todoStart:
 *                       type: string
 *                     todoLastLogin:
 *                       type: string
 *                     notesStart:
 *                       type: string
 *                     notesLastLogin:
 *                       type: string
 *                     pomodoroStart:
 *                       type: string
 *                     pomodoroLastLogin:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: Stats not found
 *       500:
 *         description: Something went wrong
 */
export const patchStats = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const data = req.body
        if (!userId || !data) return res.status(400).send({msg: 'Missing details'})
        const stats = await Stats.findOne({where: {userId: userId}})
        if (!stats) return res.status(404).send({msg: 'Stats not found'})
        for (const ops of data) {
            stats[ops.propName] = ops.value
        }
        const action = await stats.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Stats patched', payload: stats})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/stats/{userId}:
 *   delete:
 *     summary: Delete the stats of a user
 *     description: Deletes the stats of a user
 *     tags:
 *       - Stats
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     responses:
 *       200:
 *         description: Stats deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: Stats not found
 *       500:
 *         description: Something went wrong
 */
export const deleteStats = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const stats = await Stats.destroy({where: {userId: userId}})
        if (!stats) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Stats deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}