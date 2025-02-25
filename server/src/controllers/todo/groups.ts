import { Request, Response } from "express";
import db from "../../models";

const Groups = db.group

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Groups API
 */

/**
 * @swagger
 * /api/v1/groups/{selectedPageId}:
 *   get:
 *     summary: Get all groups of a page
 *     description: Returns all groups of a page
 *     tags:
 *       - Groups
 *     parameters:
 *       - in: path
 *         name: selectedPageId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the page
 *     responses:
 *       200:
 *         description: Groups of the page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       color:
 *                         type: string
 *                       selectedPageId:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       204:
 *         description: Doesnt exist yet
 *       400:
 *         description: Missing details
 *       500:
 *         description: Something went wrong
 */
export const getAllGroups = async (req: Request, res: Response) => {
    try {
        const {selectedPageId} = req.params
        if (!selectedPageId) return res.status(400).send({msg: 'Missing details'})
        const groups = await Groups.findAll({where: {selectedPageId: selectedPageId}})
        if (!groups || groups.length == 0) return res.status(204).send({msg: 'Doesnt exist yet'})
        return res.status(200).send({msg: 'Groups found', payload: groups})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
/**
 * @swagger
 * /api/v1/groups/{selectedPageId}:
 *   post:
 *     summary: Create a group for a page
 *     description: Creates a group for a page
 *     tags:
 *       - Groups
 *     parameters:
 *       - in: path
 *         name: selectedPageId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       201:
 *         description: Group created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     color:
 *                       type: string
 *                     selectedPageId:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Missing details
 *       500:
 *         description: Something went wrong
 */
export const createGroup = async (req: Request, res: Response) => {
    try {
        const {selectedPageId} = req.params
        const {name, color} = req.body
        console.log(name + color + selectedPageId)
        if (!selectedPageId || !name || !color) return res.status(400).send({msg: 'Missing details'})
        const createdGroups = await Groups.create({
            selectedPageId: selectedPageId,
            name: name,
            color: color,
        })
        if (!createdGroups) return res.status(500).send({msg: 'Something went wrong'})
        const groups = await Groups.findAll({where: {selectedPageId: selectedPageId}})
        if (!groups) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(201).send({msg: 'Group created', payload: createdGroups})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
/**
 * @swagger
 * /api/v1/groups/{selectedPageId}:
 *   delete:
 *     summary: Delete all groups for a page
 *     description: Deletes all groups for a page
 *     tags:
 *       - Groups
 *     parameters:
 *       - in: path
 *         name: selectedPageId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the page
 *     responses:
 *       200:
 *         description: Groups deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       400:
 *         description: Missing details
 *       500:
 *         description: Something went wrong
 */
export const deleteAllGroups = async (req: Request, res: Response) => {
    try {
        const { selectedPageId } = req.params
        if (!selectedPageId) return res.status(400).send({msg: 'Missing details'})
        const groups = await Groups.destroy({where: {selectedPageId: selectedPageId}})
        if (!groups) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Groups deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
