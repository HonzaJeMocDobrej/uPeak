import { Request, Response } from "express";
import db from "../../models";

const Group = db.group

/**
 * @swagger
 * /api/v1/group/{id}:
 *   get:
 *     summary: Get the group by id
 *     description: Get the group by id
 *     tags:
 *       - Group
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the group
 *     responses:
 *       200:
 *         description: The group
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
 *       404:
 *         description: Group not found
 *       500:
 *         description: Something went wrong
 */

export const getGroupById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const group = await Group.findOne({where: {id: id}})
        if (!group) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Group found', payload: group})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * tags:
 *   name: Group
 *   description: Group API
 */

/**
 * @swagger
 * /api/v1/group/{id}:
 *   patch:
 *     summary: Patch the group by id
 *     description: Patch the group by id
 *     tags:
 *       - Group
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the group
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
 *         description: Group patched
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
 *       404:
 *         description: Group not found
 *       500:
 *         description: Something went wrong
 */
export const patchGroup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id || !data) return res.status(400).send({msg: 'Missing details'})
        const group = await Group.findOne({where: {id: id}})
        if (!group) return res.status(404).send({msg: 'Stats not found'})
        for (const ops of data) {
            group[ops.propName] = ops.value
        }
        const action = await group.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Group patched', payload: group})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
/**
 * @swagger
 * /api/v1/group/{id}:
 *   delete:
 *     summary: Delete a group by id
 *     description: Delete a group by id
 *     tags:
 *       - Group
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the group
 *     responses:
 *       200:
 *         description: Group deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: Group not found
 *       500:
 *         description: Something went wrong
 */
export const deleteGroupById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const group = await Group.destroy({where: {id: id}})
        if (!group) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Group deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
