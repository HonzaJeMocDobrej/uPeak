import express from 'express'

const router = express.Router()

import * as userController from '../controllers/user'
import { uploadImg } from '../config/multer'

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/', uploadImg ,userController.createUser)
router.put('/:id', userController.updateUser, uploadImg)
router.delete('/:id', userController.deleteUser)

module.exports = router