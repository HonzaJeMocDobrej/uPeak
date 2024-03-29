import { Request, Response } from "express";
import db from "../../models";

const Note = db.notes
const sequelize = db.sequelize

export const getNoteById = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params
        if (!id || !userId) return res.status(400).send({msg: 'Missing details'})
        const note = await Note.findOne({where: {userId: userId, id: id}})
        if (!note) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Note found', payload: note})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const patchNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id || !data) return res.status(400).send({msg: 'Missing details'})
        const note = await Note.findOne({where: {id: id}})
        if (!note) return res.status(404).send({msg: 'Notes not found'})
        for (const ops of data) {
            note[ops.propName] = ops.value
        }
        const action = await note.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Note patched', payload: note})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const patchNoteImg = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log(req.file)
        if (!id || !req.file) return res.status(400).send({msg: 'Missing details'})
        const note = await Note.findOne({where: {id: id}})
        if (!note) return res.status(400).send({msg: 'Note not found'})
        note.image = req.file.path
        const action = await note.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Note image updated', payload: action})
            
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

export const deleteNoteById = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params
        if (!id || !userId) return res.status(400).send({msg: 'Missing details'})
        const countTodos = await Note.count({distinct: 'id', where: {userId: userId}})
        if (countTodos <= 1) return res.status(204).send({msg: 'Cant delete'})
        const todo = await Note.destroy({where: {id: id}})
        if (!todo) return res.status(500).send({msg: 'Something went wrong'})
        const todosPayload = await Note.findAll({where: {userId: userId}})
        // najit vsechny, foreach, checknout pozici, urcit navigate dopredu nebo dozadu
        return res.status(200).send({msg: 'Note deleted', payload: todosPayload})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
