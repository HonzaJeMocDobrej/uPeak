import { Request, Response } from "express";
import db from "../../models";

const Todo = db.todo

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
export const patchTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id || !data) return res.status(400).send({msg: 'Missing details'})
        const todo = await Todo.findOne({where: {id: id}})
        if (!todo) return res.status(404).send({msg: 'Stats not found'})
        for (const ops of data) {
            todo[ops.propName] = ops.value
        }
        const action = await todo.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Todo patched', payload: todo})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
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
