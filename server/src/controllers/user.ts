import { Request, Response } from "express";
import db from "../models/index";
import { compare, genSalt, hash } from "bcrypt";
import jwt, { Secret } from 'jsonwebtoken'
import nodemailer from 'nodemailer'

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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users API
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get the user by id
 *     description: Returns the user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     responses:
 *       200:
 *         description: The user
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
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: User not found
 *       500:
 *         description: Something went wrong
 */
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

export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params
        if (!email) return res.status(400).send({msg: 'Missing details'})
        const user = await User.findOne({where: { email: email }})
        if (!user) return res.status(404).send({msg: 'User not found'})
        return res.status(200).send({msg: 'User found', payload: user})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/users/duplicate:
 *   post:
 *     summary: Check if a user already exists
 *     description: Checks if a user already exists
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User does not exist
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
 *         description: User already exists
 *       500:
 *         description: Something went wrong
 */

export const checkForDuplicateUsers = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        console.log(email)
        if (!email) return res.status(404).send({msg: 'Missing details lmao'})
        const user = await User.findOne({where: {email: email}})
        if (user) return res.status(404).send({msg: 'User already exists'})
        return res.status(200).send({msg: 'Success, no users found'})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Creates a new user
 *     description: Creates a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: example@example.com
 *               username:
 *                 type: string
 *                 example: example
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 token:
 *                   type: string
 *                   format: bearer
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     username:
 *                       type: string
 *                     profilePic:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: Email is already used
 *       500:
 *         description: Something went wrong
 */
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
        const token = jwt.sign({username: username, email: email}, process.env.JWT_SECRET as Secret, { expiresIn: '7d' })
        if (!token) return res.status(500).send({msg: 'Unexpected error'})
        return res.status(201).send({msg: 'User created successfully', token: token, payload: createdUser})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/users/compare:
 *   post:
 *     summary: Compares a password with the user's password
 *     description: Compares a password with the user's password
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 token:
 *                   type: string
 *                   format: bearer
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     username:
 *                       type: string
 *                     profilePic:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: Email not registered yet
 *       500:
 *         description: Something went wrong
 */
export const comparePasswords = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).send({msg: 'Missing details'})
        const user = await User.findOne({where: {email: email}})
        if (!user) return res.status(400).send({msg: "Email not registered yet", failed: 'email'})
        const comparedPassword = await compare(password, user.passwordHash)
        if (!comparedPassword) return res.status(400).send({msg: 'Invalid password', failed: 'password'})
        const token = jwt.sign({id: user.id, email: user.email, username: user.username, profilePic: user.profilePic}, process.env.JWT_SECRET as Secret, { expiresIn: '7d' })
        if (!token) return res.status(500).send({msg: 'Unexpected error'})
        return res.status(200).send({msg: 'Successfully logged in', token: token, payload: user})
    
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/users/updateProfilePic/{email}:
 *   patch:
 *     summary: Update user's profile picture
 *     description: Updates the profile picture of a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully updated profile picture
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
 *                     email:
 *                       type: string
 *                     username:
 *                       type: string
 *                     profilePic:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                 token:
 *                   type: string
 *                   format: bearer
 *                 profilePic:
 *                   type: string
 *       400:
 *         description: Missing details
 *       404:
 *         description: User not found
 *       500:
 *         description: Something went wrong
 */
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
        const token = jwt.sign({id: user.id, email: user.email, username: user.username, profilePic: user.profilePic}, process.env.JWT_SECRET as Secret, { expiresIn: '7d' })
        if (!token) return res.status(500).send({msg: 'Unexpected error'})
        if (req.file) return res.status(200).send({msg: 'User profile picture updated', payload: user, token: token, profilePic: req.file?.path})
        return res.status(200).send({msg: 'User profile picture updated', payload: user, token: token, profilePic: 'images\\defaultPic.svg'})
            
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/users/{id}:
 *   patch:
 *     summary: Update a user
 *     description: Updates a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
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
 *         description: User updated
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
 *                     email:
 *                       type: string
 *                     username:
 *                       type: string
 *                     profilePic:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                 token:
 *                   type: string
 *                   format: bearer
 *       400:
 *         description: Missing details or invalid password
 *       404:
 *         description: User not found
 *       500:
 *         description: Something went wrong
 */
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id || !data) return res.status(400).send({msg: 'Missing details'})
        const user = await User.findOne({where: {id: id}})
        if (!user) return res.status(400).send({msg: 'User not found'})
        let comparedPassword
        for (const ops of data) {
            user[ops.propName] = ops.value
            if (ops.propName == 'password') {
                comparedPassword = await compare(ops.value, user.passwordHash)
            }
        }
        if (!comparedPassword) return res.status(400).send({msg: 'Invalid password'})
        const action = await user.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        const token = jwt.sign({id: user.id, email: user.email, username: user.username, profilePic: user.profilePic}, process.env.JWT_SECRET as Secret, { expiresIn: '7d' })
        return res.status(200).send({msg: 'User updated', payload: user, token: token})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/users/password/code:
 *   patch:
 *     summary: Updates the password of a user with a code
 *     description: Updates the password of a user with a code
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPass:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user
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
 *                     email:
 *                       type: string
 *                     username:
 *                       type: string
 *                     profilePic:
 *                       type: string
 *                     passwordHash:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                 token:
 *                   type: string
 *                   format: bearer
 *       400:
 *         description: Missing details
 *       404:
 *         description: User not found
 *       500:
 *         description: Something went wrong
 */
export const updateUserPasswordCode = async (req: Request, res: Response) => {
    try {
        const {newPass, email} = req.body
        console.log(req.body)
        if (!email || !newPass) return res.status(400).send({msg: 'Missing details'})
        const user = await User.findOne({where: {email: email}})
        if (!user) return res.status(400).send({msg: 'User not found'})
        const salt = await genSalt(12)
        const passwordHash = await hash(newPass, salt)
        user.passwordHash = passwordHash
        const action = await user.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        const token = jwt.sign({id: user.id, email: user.email, username: user.username, profilePic: user.profilePic}, process.env.JWT_SECRET as Secret, { expiresIn: '7d' })
        return res.status(200).send({msg: 'User updated', payload: user, token: token})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/users/{id}/password:
 *   patch:
 *     summary: Update the password of a user
 *     description: Updates the password of a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPass:
 *                 type: string
 *               newPass:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
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
 *                     email:
 *                       type: string
 *                     username:
 *                       type: string
 *                     profilePic:
 *                       type: string
 *                 token:
 *                   type: string
 *                   format: bearer
 *       400:
 *         description: Missing details
 *       404:
 *         description: User not found
 *       500:
 *         description: Something went wrong
 */
export const updateUserPassword = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const {oldPass, newPass} = req.body
        if (!id || !oldPass || !newPass) return res.status(400).send({msg: 'Missing details'})
        const user = await User.findOne({where: {id: id}})
        if (!user) return res.status(400).send({msg: 'User not found'})
        const comparedPassword = await compare(oldPass, user.passwordHash)
        if (!comparedPassword) return res.status(400).send({msg: 'Invalid password'})
        const salt = await genSalt(12)
        const passwordHash = await hash(newPass, salt)
        user.passwordHash = passwordHash
        const action = await user.save()
        if (!action) return res.status(500).send({msg: 'Something went wrong'})
        const token = jwt.sign({id: user.id, email: user.email, username: user.username, profilePic: user.profilePic}, process.env.JWT_SECRET as Secret, { expiresIn: '7d' })
        return res.status(200).send({msg: 'User updated', payload: user, token: token})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     responses:
 *       200:
 *         description: User deleted
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
 *         description: User not found
 *       500:
 *         description: Something went wrong
 */
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

/**
 * @swagger
 * /api/v1/users/2fa:
 *   post:
 *     summary: Send 2FA code to the user
 *     description: Sends a 6-digit code to the user's email
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Code sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 code:
 *                   type: string
 *       404:
 *         description: Something went wrong
 *       500:
 *         description: Server error
 */
export const send2FA = async (req: Request, res: Response) => {
    
    try {

        let error: string = ''
        let code: string = ''

    const setCode = () => {
        code = ''
        for (let i = 0; i < 6; i++) {
            code += Math.floor(Math.random() * 10)
        }
    }


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_NAME,
                pass: process.env.MAIL_PASSWORD
            }
        })

        const mainLogic = async () => {

            setCode()

            try {
                const info = await transporter.sendMail({
                    from: `uPeak <upeakapp@gmail.com>`,
                    to: req.body.email,
                    subject: "Verify your Email",
                    html: `
                        <h2>Here is your code:</h2>
                        <h3>${code}</h3>
                    `
                })
    
                console.log('message Sent' + info.messageId)
                return res.status(200).send({msg: 'Code sent successfully', code: code})
            } catch (error) {
                return res.status(404).send({msg: 'Something went wrong'})
            }

        }

        mainLogic()

        } 
    
        catch (err) {
            res.status(500).send(err)
        }

}