import { Request, Response } from "express";
import db from "../../models";

const Stats = db.stats

export const getStatsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const stats = await Stats.findOne({where: {userId: id}})
        if (!stats || stats.length == 0) return res.status(404).send({msg: 'Stats not found'})
        return res.status(200).send({msg: 'Stats found', payload: stats})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const createStats = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log(id)
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const stats = await Stats.findOne({where: {userId: id}})
        if (stats) return res.status(400).send({msg: 'User already has stats'})
        const createdStats = await Stats.create({
            userId: id
        })
        if (!createdStats) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(201).send({msg: 'Stats created', payload: createdStats})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const patchStats = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id || !data) return res.status(400).send({msg: 'Missing details'})
        const stats = await Stats.findOne({where: {userId: id}})
        if (!stats) return res.status(404).send({msg: 'Stats not found'})
        for (const ops of data) {
            stats[ops.propName] = ops.value
        }
        const action = await stats.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Stats patched', payload: stats})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const deleteStats = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const stats = await Stats.destroy({where: {userId: id}})
        if (!stats) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Stats deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}