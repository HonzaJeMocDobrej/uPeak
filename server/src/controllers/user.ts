import { Request, Response } from "express";
import db from "../models/index";
import { genSalt, hash } from "bcrypt";

const User = db.users

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll()
        if (!users || users.length == 0) return res.status(500).send({msg: 'Users not found'})
        return res.status(200).send({msg: 'Users found', payload: users}) 
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const user = await User.findOne({where: { id: id }})
        if (!user) return res.status(404).send({msg: 'User not found'})
        return res.status(200).send({msg: 'User found', payload: user})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body
        if (!email || !username || !password) return res.status(400).send({msg: 'Missing details'})
        const user = await User.findOne({ where: { email: email } })
        if (user) return res.status(400).send({msg: 'Email is already used'})
        const salt = await genSalt(12)
        const passwordHash = await hash(password, salt)
        const createdUser = await User.create({
            email: email,
            username: username,
            passwordHash: passwordHash,

        })
        if (!createdUser) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(201).send({msg: 'User created successfully', payload: createdUser})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

export const updateUserProfilePic =async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id || !req.file) return res.status(400).send({msg: 'Missing details'})
        const user = await User.findOne({where: {id: id}})
        if (!user) return res.status(400).send({msg: 'User not found'})
        user.profilePic = req.file.path
        const action = await user.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'User profile picture updated', payload: action})
            
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        console.log(req.file?.path)
        const { id } = req.params
        const data = req.body
        if (!id || !data) return res.status(400).send({msg: 'Missing details'})
        const user = await User.findOne({where: {id: id}})
        if (!user) return res.status(400).send({msg: 'User not found'})
        for (const ops of data) {
            user[ops.propName] = ops.value
        }
        const action = await user.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'User updated', payload: user})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({msg: 'Missing details'})
        const user = await User.destroy({where: {id: id}})
        if (!user) return res.status(500).send({msg: 'Something went wrong'})
        return res.status(200).send({msg: 'User deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}