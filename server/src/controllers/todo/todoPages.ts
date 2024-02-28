import { Request, Response } from "express";
import db from '../../models/index'
const { Op } = require('sequelize')

const TodoPages = db.todoPage

export const formatFullDate = (dayNum:number, monthNum:number, year:number) => {
    if (dayNum >= 10 && monthNum >= 10){
        return `${year}${monthNum}${dayNum}` as string
      }
      if (dayNum < 10 && monthNum >= 10){
        return `0${year}${monthNum}${dayNum}` as string
      }
      if (dayNum >= 10 && monthNum < 10){
        return `${year}0${monthNum}${dayNum}` as string
      }
      if (dayNum < 10 && monthNum < 10) {
        return `${year}0${monthNum}0${dayNum}` as string
      }
}

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