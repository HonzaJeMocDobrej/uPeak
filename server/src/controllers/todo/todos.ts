import { Request, Response } from "express";
import db from "../../models";

const Todos = db.todo

export const getAllTodos = async (req: Request, res: Response) => {
    try {
        const {selectedPageId} = req.params
        if (!selectedPageId) return res.status(400).send({msg: 'Missing details'})
        const todos = await Todos.findAll({where: {selectedPageId: selectedPageId}})
        if (!todos || todos.length == 0) return res.status(404).send({msg: 'Todos not found'})
        return res.status(200).send({msg: 'Todos found', payload: todos})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
export const createTodo = async (req: Request, res: Response) => {
    try {
        const {selectedPageId} = req.params
        const {name, color, priority} = req.body
        if (!selectedPageId || !name || !color || !priority) return res.status(400).send({msg: 'Missing details'})
        const createdTodos = await Todos.create({
            selectedPageId: selectedPageId,
            name: name,
            color: color,
            priority: priority
        })
        if (!createdTodos) return res.status(500).send({msg: 'Something went wrong'})
        const todos = await Todos.findAll({where: {selectedPageId: selectedPageId}})
        if (!todos) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(201).send({msg: 'Todo created', payload: todos})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
export const deleteAllTodos = async (req: Request, res: Response) => {
    try {
        const { selectedPageId } = req.params
        if (!selectedPageId) return res.status(400).send({msg: 'Missing details'})
        const todoPages = await Todos.destroy({where: {selectedPageId: selectedPageId}})
        if (!todoPages) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Todos deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
