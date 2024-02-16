import { Request, Response } from "express";
import db from "../../models";

const Note = db.notes
const sequelize = db.sequelize

export const getNoteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const note = await Note.findOne({where: {id: id}})
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
        const todo = await Note.findOne({where: {id: id}})
        if (!todo) return res.status(404).send({msg: 'Stats not found'})
        for (const ops of data) {
            todo[ops.propName] = ops.value
        }
        const action = await todo.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Note patched', payload: todo})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const patchNoteImg = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
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
        const { id } = req.params
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const todo = await Note.destroy({where: {id: id}})
        if (!todo) return res.status(500).send({msg: 'Something went wrong'})
        const getLastTodo = await Note.findAll({where: {id: id}})
        // najit vsechny, foreach, checknout pozici, urcit navigate dopredu nebo dozadu
        return res.status(200).send({msg: 'Note deleted', payload: getLastTodo})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
