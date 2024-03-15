import express from 'express'

const router = express.Router()

import * as userController from '../controllers/user'
import { uploadUserProfilePic } from '../config/multer'

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

router.post('/compare', userController.comparePasswords)
router.patch('/patchimg/:email', uploadUserProfilePic, userController.updateUserProfilePic)

module.exports = router