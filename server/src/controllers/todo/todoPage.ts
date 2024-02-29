import { Request, Response } from "express";
import db from '../../models/index'

const TodoPage = db.todoPage


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