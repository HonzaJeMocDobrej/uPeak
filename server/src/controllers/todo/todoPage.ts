import { Request, Response } from "express";
import db from '../../models/index'

const TodoPage = db.todoPage

/**
 * @swagger
 * tags:
 *   name: Todo Page
 *   description: Todo Page API
 */

/**
 * @swagger
 * /api/v1/todoPages/{userId}/{id}:
 *   get:
 *     summary: Get the todo page by id
 *     description: Get the todo page by id
 *     tags:
 *       - Todo Page
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the todo page
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     responses:
 *       200:
 *         description: The todo page
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
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Missing details
 *       500:
 *         description: Something went wrong
 */
export const getUserTodoPageById =async (req:Request, res: Response) => {
    try {
        const { id, userId } = req.params
        if (!id || !userId) return res.status(400).send({msg: 'Missing details'})
        const todoPage = await TodoPage.findOne({where: {userId: userId, id: id}})
        if (!todoPage) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Todo Page found', payload: todoPage})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}


/**
 * @swagger
 * /api/v1/todoPage/{id}:
 *   patch:
 *     summary: Patch the todo page by id
 *     description: Patch the todo page by id
 *     tags:
 *       - Todo Page
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the todo page
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
 *         description: The todo page
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
export const patchTodoPage =async (req:Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id || !data) return res.status(400).send({msg: 'Missing details'})
        const todoPage = await TodoPage.findOne({where: {id: id}})
        if (!todoPage) return res.status(404).send({msg: 'Stats not found'})
        for (const ops of data) {
            todoPage[ops.propName] = ops.value
        }
        const action = await todoPage.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Todo Page patched', payload: todoPage})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/todoPage/{id}:
 *   delete:
 *     summary: Delete the todo page by id
 *     description: Delete the todo page by id
 *     tags:
 *       - Todo Page
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the todo page
 *     responses:
 *       200:
 *         description: Todo Page deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       400:
 *         description: Missing details
 *       500:
 *         description: Something went wrong
 */
export const deleteTodoPage =async (req:Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const todoPage = await TodoPage.destroy({where: {id: id}})
        if (!todoPage) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Todo Page deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}