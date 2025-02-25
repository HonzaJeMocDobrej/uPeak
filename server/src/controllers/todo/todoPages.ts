import { Request, Response } from "express";
import db from '../../models/index'
const { Op } = require('sequelize')

const TodoPages = db.todoPage

export const formatFullDate = (dayNum:number, monthNum:number, year:number) => {
    if (dayNum >= 10 && monthNum >= 10){
        return `${year}${monthNum}${dayNum}` as string
      }
      if (dayNum < 10 && monthNum >= 10){
        return `${year}${monthNum}0${dayNum}` as string
      }
      if (dayNum >= 10 && monthNum < 10){
        return `${year}0${monthNum}${dayNum}` as string
      }
      if (dayNum < 10 && monthNum < 10) {
        return `${year}0${monthNum}0${dayNum}` as string
      }
}

/**
 * @swagger
 * tags:
 *   name: Todo Pages
 *   description: Todo Pages API
 */

/**
 * @swagger
 * /api/v1/todoPages/{userId}:
 *   get:
 *     summary: Get the first todo page by userId
 *     description: Returns the first todo page by userId
 *     tags:
 *       - Todo Pages
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     responses:
 *       200:
 *         description: The first todo page
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
 *                     dayNum:
 *                       type: string
 *                     dayName:
 *                       type: string
 *                     monthNum:
 *                       type: string
 *                     monthName:
 *                       type: string
 *                     year:
 *                       type: string
 *                     fullDate:
 *                       type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: First Todo Page not found
 *       500:
 *         description: Something went wrong
 */
export const getTheFirstTodoPage =async (req:Request, res: Response) => {
    try {
        const {userId} = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const minFullDate = await TodoPages.min('fullDate', {where: {userId: userId}})
        if (!minFullDate) return res.status(404).send({msg: 'First Todo Page not found'})
        const todoPage = await TodoPages.findOne({where: {userId: userId, fullDate: minFullDate}})
        return res.status(200).send({msg: 'First Todo Page found', payload: todoPage})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/todoPages/{userId}:
 *   post:
 *     summary: Create a todo page by userId
 *     description: Creates a todo page by userId
 *     tags:
 *       - Todo Pages
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     requestBody:
 *       description: The todo page to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dayNum:
 *                 type: string
 *               dayName:
 *                 type: string
 *               monthNum:
 *                 type: string
 *               monthName:
 *                 type: string
 *               year:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo Page created
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
 *                     dayNum:
 *                       type: string
 *                     dayName:
 *                       type: string
 *                     monthNum:
 *                       type: string
 *                     monthName:
 *                       type: string
 *                     year:
 *                       type: string
 *                     fullDate:
 *                       type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: First Todo Page not found
 *       500:
 *         description: Something went wrong
 */
export const createTodoPage =async (req:Request, res: Response) => {
    try {
        const {userId} = req.params
        const {dayNum, dayName, monthNum, monthName, year} = req.body
        let dateString
        
        if (!userId || !dayNum || !dayName || !monthNum || !monthName || !year) return res.status(400).send({msg: 'Missing details'})
        const existingTodoPage = await TodoPages.findOne({where: {userId: userId, dayNum: dayNum, monthNum: monthNum, year: year}})
        if (existingTodoPage) return res.status(200).send({msg: 'Todo Page already exists', payload: existingTodoPage})
        const createdTodoPages = await TodoPages.create({
            userId: userId,
            dayNum: dayNum,
            dayName: dayName,
            monthNum: monthNum,
            monthName: monthName,
            year: year,
            fullDate: formatFullDate(dayNum, monthNum, year)
        })
        if (!createdTodoPages) return res.status(500).send({msg: 'Something went wrong'})
        const todoPages = await TodoPages.findAll({where: {userId: userId}})
        if (!todoPages) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(201).send({msg: 'Todo Page created', payload: createdTodoPages})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/todoPages/{userId}:
 *   delete:
 *     summary: Delete all todo pages of a user that are older than today
 *     description: Delete all todo pages of a user that are older than today
 *     tags:
 *       - Todo Pages
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     responses:
 *       200:
 *         description: All old Todo Pages deleted
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
 *                     dayNum:
 *                       type: string
 *                     dayName:
 *                       type: string
 *                     monthNum:
 *                       type: string
 *                     monthName:
 *                       type: string
 *                     year:
 *                       type: string
 *                     fullDate:
 *                       type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: First Todo Page not found
 *       500:
 *         description: Something went wrong
 */

export const deleteOldTodoPages =async (req:Request, res: Response) => {
    try {
        const now = new Date()
        const parsedFullDate = parseInt(formatFullDate(now.getDate(), now.getMonth() + 1, now.getFullYear()) as string)
        const { userId } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const getTodoPages = await TodoPages.findAll({where: {userId: userId, fullDate: { [Op.lt]: parsedFullDate }}})
        const todoPages = await TodoPages.destroy({where: {userId: userId, fullDate: { [Op.lt]: parsedFullDate }}})
        if (!todoPages) return res.status(200).send({msg: 'All sorted'})
        return res.status(200).send({msg: 'Todo Pages deleted', payload: getTodoPages})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}