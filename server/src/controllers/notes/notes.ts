import { Request, Response } from "express";
import db from "../../models";

const Notes = db.notes
const { Op } = require("sequelize");

export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const notes = await Notes.findAll({where: {userId: userId}})
        if (!notes || notes.length == 0) return res.status(404).send({msg: 'Notes not found'})
        return res.status(200).send({msg: 'Notes found', payload: notes})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const searchNotes = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params
        const {searchVal} = req.body
        if (!userId && !searchVal) return res.status(400).send({msg: 'Missing details'})
        const allNotes = await Notes.findAll({where: {userId: userId}})
        if (searchVal == "") return res.status(200).send({msg: 'All notes', payload: allNotes})
        const searchNotes = await Notes.findAll({where: {userId: userId, headline: {[Op.startsWith]: searchVal}}})
        if (!searchNotes) return res.status(204).send({msg: 'No notes', payload: []})
        return res.status(200).send({msg: 'Notes found', payload: searchNotes})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const getTheFirstNote = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const notes = await Notes.findOne({where: {userId: userId}})
        if (!notes || notes.length == 0) return res.status(404).send({msg: 'Notes not found'})
        return res.status(200).send({msg: 'Notes found', payload: notes})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const createNotes = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const createdNotes = await Notes.create({
            userId: userId,
        })
        if (!createdNotes) return res.status(500).send({msg: 'Something went wrong'})
        const notes = await Notes.findAll({where: {userId: userId}})
        if (!notes) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(201).send({msg: 'Note created', payload: createdNotes, notes})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
export const deleteAllNotes = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const notes = await Notes.destroy({where: {userId: userId}})
        if (!notes) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Notes deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
