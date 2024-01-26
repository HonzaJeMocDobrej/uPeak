import express from 'express'

const router = express.Router()

import * as userController from '../controllers/user'
import { uploadImg } from '../config/multer'

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.put('/:id', uploadImg, userController.updateUser)
router.delete('/:id', userController.deleteUser)

router.patch('/:id/patchimg', uploadImg, userController.updateUserProfilePic)

module.exports = router