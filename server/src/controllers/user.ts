import { Request, Response } from "express";
import db from "../models/index";
import { compare, genSalt, hash } from "bcrypt";
import jwt, { Secret } from 'jsonwebtoken'

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
        if (username.length >= 19) return res.status(400).send({msg: 'Username is too long'})
        if (password.length <= 3) return res.status(400).send({msg: 'Password is too short'})
        const salt = await genSalt(12)
        const passwordHash = await hash(password, salt)
        const createdUser = await User.create({
            email: email,
            username: username,
            passwordHash: passwordHash,

        })
        if (!createdUser) return res.status(500).send({msg: 'Something went wrong'})
        const token = jwt.sign({username: username, email: email}, process.env.JWT_SECRET as Secret, { expiresIn: '1h' })
        if (!token) return res.status(500).send({msg: 'Unexpected error'})
        return res.status(201).send({msg: 'User created successfully', token: token, payload: createdUser})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

export const comparePasswords = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).send({msg: 'Missing details'})
        const user = await User.findOne({where: {email: email}})
        if (!user) return res.status(400).send({msg: "Email not registered yet", failed: 'email'})
        const comparedPassword = await compare(password, user.passwordHash)
        if (!comparedPassword) return res.status(400).send({msg: 'Invalid password', failed: 'password'})
        const token = jwt.sign({id: user.id, email: user.email, username: user.username, profilePic: user.profilePic}, process.env.JWT_SECRET as Secret, { expiresIn: '1h' })
        if (!token) return res.status(500).send({msg: 'Unexpected error'})
        return res.status(200).send({msg: 'Successfully logged in', token: token, payload: user})
    
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

export const updateUserProfilePic =async (req: Request, res: Response) => {
    try {
        let updatedUser
        const { email } = req.params
        console.log(email)
        if (!email) return res.status(400).send({msg: 'Missing details'})
        const user = await User.findOne({where: {email: email}})
        if (!user) return res.status(400).send({msg: 'User not found'})
        if (req.file) {
            updatedUser = await User.update({ profilePic: req.file.path }, {where: {email: email}})
        }
        if (!req.file) {
            updatedUser = await User.update({profilePic: 'images\\defaultPic.svg'}, {where: {email: email}})
        }
        if (!updatedUser) return res.status(500).send({msg: 'Something went wrong'})
        const token = jwt.sign({id: user.id, email: user.email, username: user.username, profilePic: user.profilePic}, process.env.JWT_SECRET as Secret, { expiresIn: '1h' })
        if (!token) return res.status(500).send({msg: 'Unexpected error'})
        if (req.file) return res.status(200).send({msg: 'User profile picture updated', payload: user, token: token, profilePic: req.file?.path})
        return res.status(200).send({msg: 'User profile picture updated', payload: user, token: token, profilePic: 'images\\defaultPic.svg'})
            
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