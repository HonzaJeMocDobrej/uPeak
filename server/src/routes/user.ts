import express from 'express'

const router = express.Router()

import * as userController from '../controllers/user'
import { uploadUserProfilePic } from '../config/multer'

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.put('/:id', uploadUserProfilePic, userController.updateUser)
router.delete('/:id', userController.deleteUser)

router.patch('/patchimg/:id', uploadUserProfilePic, userController.updateUserProfilePic)

module.exports = router