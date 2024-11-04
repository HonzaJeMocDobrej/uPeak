import express from 'express'

const router = express.Router()

import * as userController from '../controllers/user'
import { uploadUserProfilePic } from '../config/multer'

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/duplicate', userController.checkForDuplicateUsers)
router.post('/', userController.createUser)
router.patch('/:id', userController.updateUser)
router.patch('/:id/password', userController.updateUserPassword)
router.delete('/:id', userController.deleteUser)

router.post('/compare', userController.comparePasswords)
router.patch('/patchimg/:email', uploadUserProfilePic, userController.updateUserProfilePic)

router.post('/2fa', userController.send2FA)

module.exports = router