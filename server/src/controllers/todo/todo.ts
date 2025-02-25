import { Request, Response } from "express";
import db from "../../models";

const Todo = db.todo

/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: Todo API
 */

/**
 * @swagger
 * /api/v1/todo/{id}:
 *   get:
 *     summary: Get the todo by id
 *     description: Returns the todo by id
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the todo
 *     responses:
 *       200:
 *         description: The todo
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
 *                     name:
 *                       type: string
 *                     shortDesc:
 *                       type: string
 *                     color:
 *                       type: string
 *                     priority:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Something went wrong
 */
export const getTodoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const todo = await Todo.findOne({where: {id: id}})
        if (!todo) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Todo found', payload: todo})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
/**
 * @swagger
 * /api/v1/todo/{id}:
 *   put:
 *     summary: Patch the todo by id
 *     description: Patch the todo by id
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the todo
 *     requestBody:
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
 *               priority:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       200:
 *         description: The todo
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
 *                     name:
 *                       type: string
 *                     shortDesc:
 *                       type: string
 *                     color:
 *                       type: string
 *                     priority:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Something went wrong
 */
export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id || !data) return res.status(400).send({msg: 'Missing details'})
        const todo = await Todo.findOne({where: {id: id}})
        if (!todo) return res.status(404).send({msg: 'Todo not found'})
        // for (const ops of data) {
        //     todo[ops.propName] = ops.value
        // }
        todo.name = data.name
        todo.shortDesc = data.shortDesc
        todo.priority = data.priority
        todo.color = data.color
        const action = await todo.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Todo patched', payload: todo})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
/**
 * @swagger
 * /api/v1/todo/{id}:
 *   delete:
 *     summary: Delete a todo by id
 *     description: Delete a todo by id
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the todo
 *     responses:
 *       200:
 *         description: Todo deleted
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
export const deleteTodoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const todo = await Todo.destroy({where: {id: id}})
        if (!todo) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Todo deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/todo/submit/{id}:
 *   delete:
 *     summary: Submit a todo by id
 *     description: Submit a todo by id
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the todo
 *     responses:
 *       200:
 *         description: Todo submitted
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
export const submitTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const todo = await Todo.destroy({where: {id: id}})
        if (!todo) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Todo deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
