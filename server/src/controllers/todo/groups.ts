import { Request, Response } from "express";
import db from "../../models";

const Groups = db.group

export const getAllGroups = async (req: Request, res: Response) => {
    try {
        const {selectedPageId} = req.params
        if (!selectedPageId) return res.status(400).send({msg: 'Missing details'})
        const groups = await Groups.findAll({where: {selectedPageId: selectedPageId}})
        if (!groups || groups.length == 0) return res.status(404).send({msg: 'Groups not found'})
        return res.status(200).send({msg: 'Groups found', payload: groups})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
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
        return res.status(201).send({msg: 'Group created', payload: groups})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
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
