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

/**
 * @swagger
 * /api/v1/note/{userId}/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Note found
 *                 payload:
 *                   $ref: '#/components/schemas/Note'
 *       400:
 *         description: Missing details
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/note/{id}:
 *   patch:
 *     summary: Update a note's details
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 propName:
 *                   type: string
 *                 value:
 *                   type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Note patched
 *                 payload:
 *                   $ref: '#/components/schemas/Note'
 *       400:
 *         description: Missing details
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/note/img/{id}:
 *   patch:
 *     summary: Update a note's image
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Note image updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Note image updated
 *                 payload:
 *                   $ref: '#/components/schemas/Note'
 *       400:
 *         description: Missing details or invalid file type
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/note/{userId}/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Note deleted
 *       400:
 *         description: Missing details
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */
