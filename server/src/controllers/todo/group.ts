import { Request, Response } from "express";
import db from "../../models";

const Group = db.group

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
export const deleteGroupById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const group = await Group.destroy({where: {id: id}})
        if (!group) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Todo deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
