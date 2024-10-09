import { Request, Response } from "express";
import db from "../../models";

const Achievements = db.notifAchievements
const Notes = db.notes
const TodoPages = db.todoPage
const Groups = db.group
const Todos = db.todo

export const getAchievements = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const achievements = await Achievements.findOne({where: {userId: userId}})
        if (!achievements || achievements.length == 0) return res.status(404).send({msg: 'Achievements not found'})
        return res.status(200).send({msg: 'Achievements found', payload: achievements})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const createAchievements = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const createdAchievements = await Achievements.create({
            userId: userId 
        })
        if (!createdAchievements) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(201).send({msg: 'Achievements created', payload: createdAchievements})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const patchAchievements = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const data = req.body
        if (!userId || !data) return res.status(400).send({msg: 'Missing details'})
        const achievements = await Achievements.findOne({where: {userId: userId}})
        if (!achievements) return res.status(404).send({msg: 'Achievements not found'})
        for (const ops of data) {
            achievements[ops.propName] = ops.value
        }
        const action = await achievements.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Achievements patched', payload: achievements})
    } catch (err) {
        res.status(500).send(err)
    }
}

export const getCreatedNotesCount = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(400).send({msg: 'Missing details'})
        const notes = await Notes.count({where: {userId: userId}})
        if (!notes) return res.status(404).send({msg: 'Notes not found'})
        // const action = await achievements.save()
        // if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Notes count found', payload: notes})
    } catch (err) {
        res.status(500).send(err)
    }
}

export const addAchievementsCount = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const { value } = req.body
        if (!userId || !value) return res.status(400).send({msg: 'Missing details'})
        const achievements = await Achievements.findOne({where: {userId: userId}})
        if (!achievements) return res.status(404).send({msg: 'Notes not found'})
        achievements[value] += 1
        const action = await achievements.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'Todos count found', payload: achievements})
    } catch (err) {
        res.status(500).send(err)
    }
}



// export const getCreatedTodosCount = async (req: Request, res: Response) => {
//     try {
//         const { userId } = req.params
//         if (!userId) return res.status(400).send({msg: 'Missing details'})
//         const todoPages = await TodoPages.findAll({where: {userId: userId}})
//         if (!todoPages) return res.status(404).send({msg: 'TodoPages not found'})
    
//             //-------Creating Array of todoPages id's---------

//         let todoPageIdArr = []
//         for (const one of todoPages) {
//             todoPageIdArr.push(one.id)
//         }

//         //-------Creating Array of groups to access their id's---------

//         let groupsArr = []
//         for (const id of todoPageIdArr) {
//             const groups = await Groups.findAll({where: {selectedPageId: id}})
//             groupsArr.push(...groups)
//         }

//         //-------Creating Array of groups id's---------
        
//         let groupsIdArr = []
//         for (const one of groupsArr) {
//             groupsIdArr.push(one.id)
//         }

//         //-------Summing all the todos count from every group---------

//         let todosCount = 0
//         for (const id of groupsIdArr) {
//             const todos = await Todos.count({where: {groupId: id}})
//             todosCount += todos
//         }

//         // const action = await achievements.save()
//         // if (!action) return res.status(500).send({msg: 'Something went wrong'})
//         return res.status(200).send({msg: 'Todos count found', payload: todosCount})
//     } catch (err) {
//         res.status(500).send(err)
//     }
// }
