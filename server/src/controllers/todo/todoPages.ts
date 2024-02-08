import { Request, Response } from "express";
import db from '../../models/index'

const TodoPages = db.todoPage

export const getTheFirstTodoPage =async (req:Request, res: Response) => {
    try {
        const {userId} = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const todoPages = await TodoPages.findOne({where: {userId: userId}})
        if (!todoPages) return res.status(404).send({msg: 'First Todo Page not found'})
        return res.status(200).send({msg: 'First Todo Page found', payload: todoPages})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const createTodoPage =async (req:Request, res: Response) => {
    try {
        const {userId} = req.params
        const {dayNum, dayName, monthNum, monthName, year} = req.body
        let dateString
        if (dayNum >= 10 && monthNum >= 10){
            dateString = `${dayNum}${monthNum}${year}`
          }
          if (dayNum < 10 && monthNum >= 10){
            dateString = `0${dayNum}${monthNum}${year}`
          }
          if (dayNum >= 10 && monthNum < 10){
            dateString = `${dayNum}0${monthNum}${year}`
          }
          if (dayNum < 10 && monthNum < 10) {
            dateString = `0${dayNum}0${monthNum}${year}`
          }
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
            fullDate: dateString
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

export const deleteOldTodoPages =async (req:Request, res: Response) => {
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