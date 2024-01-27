import { Request, Response } from "express";
import db from '../../models/index'

const todoPage = db.todoPage

export const getAllUserTodosPages =async (req:Request, res: Response) => {
    
}

export const getUserTodoPageById =async (req:Request, res: Response) => {
    
}

export const createTodoPage =async (req:Request, res: Response) => {
    try {
        res.status(200).send({msg: 'it works'})
    } catch (err) {
        res.status(200).send({msg: 'it works'})
    }
}

export const patchTodoPage =async (req:Request, res: Response) => {
    
}

export const deleteTodoPage =async (req:Request, res: Response) => {
    
}