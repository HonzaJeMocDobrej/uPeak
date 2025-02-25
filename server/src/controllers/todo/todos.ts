import { Request, Response } from "express";
import db from "../../models";

const Todos = db.todo

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todos API
 */

/**
 * @swagger
 * /api/v1/todos/{groupId}:
 *   get:
 *     summary: Get all todos for a group
 *     description: Returns all todos for a given group
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the group
 *     responses:
 *       200:
 *         description: All todos for the group
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
 *                       name:
 *                         type: string
 *                       shortDesc:
 *                         type: string
 *                       priority:
 *                         type: string
 *                       color:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       400:
 *         description: Missing details
 *       500:
 *         description: Something went wrong
 */
export const getAllTodos = async (req: Request, res: Response) => {
    try {
        const {groupId} = req.params
        if (!groupId) return res.status(400).send({msg: 'Missing details'})
        const todos = await Todos.findAll({where: {groupId: groupId}})
        if (!todos || todos.length == 0) return res.status(204).send({msg: 'Doesnt exist'})
        return res.status(200).send({msg: 'Todos found', payload: todos})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
/**
 * @swagger
 * /api/v1/todos/{groupId}:
 *   post:
 *     summary: Create a todo
 *     description: Creates a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the group
 *     requestBody:
 *       description: The todo to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               shortDesc:
 *                 type: string
 *               color:
 *                 type: string
 *               priority:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo created
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
 *                       name:
 *                         type: string
 *                       shortDesc:
 *                         type: string
 *                       color:
 *                         type: string
 *                       priority:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       400:
 *         description: Missing details
 *       500:
 *         description: Something went wrong
 */
export const createTodo = async (req: Request, res: Response) => {
    try {
        const {groupId} = req.params
        const {name, color, priority, shortDesc} = req.body
        if (!groupId || !name || !color || !priority) return res.status(400).send({msg: 'Missing details'})
        const createdTodos = await Todos.create({
            groupId: groupId,
            name: name,
            shortDesc: shortDesc,
            color: color,
            priority: priority
        })
        if (!createdTodos) return res.status(500).send({msg: 'Something went wrong'})
        const todos = await Todos.findAll({where: {groupId: groupId}})
        if (!todos) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(201).send({msg: 'Todo created', payload: todos})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
/**
 * @swagger
 * /api/v1/todo/group/{groupId}:
 *   delete:
 *     summary: Delete all todos in a group
 *     description: Delete all todos in a group
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the group
 *     responses:
 *       200:
 *         description: Todos deleted
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
export const deleteAllTodos = async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params
        if (!groupId) return res.status(400).send({msg: 'Missing details'})
        const todos = await Todos.destroy({where: {groupId: groupId}})
        if (!todos) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Todos deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
