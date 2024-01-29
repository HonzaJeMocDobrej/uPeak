import { Request, Response } from "express";
import db from '../../models/index'

const TodoPages = db.todoPage

export const getAllUserTodosPages =async (req:Request, res: Response) => {
    try {
        const {userId} = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const todoPages = await TodoPages.findAll({where: {userId: userId}})
        if (!todoPages || todoPages.length == 0) return res.status(404).send({msg: 'Todo Pages not found'})
        return res.status(200).send({msg: 'Todo Pages found', payload: todoPages})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const createTodoPage =async (req:Request, res: Response) => {
    try {
        const {userId} = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const createdTodoPages = await TodoPages.create({
            userId: userId,
            dayNum: 5,
            dayName: 'friday',
            monthNum: 3,
            monthName: 'March',
            year: 2024
        })
        if (!createdTodoPages) return res.status(500).send({msg: 'Something went wrong'})
        const todoPages = await TodoPages.findAll({where: {userId: userId}})
        if (!todoPages) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(201).send({msg: 'Todo Page created', payload: todoPages})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const deleteAllTodoPages =async (req:Request, res: Response) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const todoPages = await TodoPages.destroy({where: {userId: userId}})
        if (!todoPages) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Todo Pages deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}