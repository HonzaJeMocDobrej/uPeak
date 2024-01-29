import express from 'express'

const router = express.Router()

import * as todoPagesController from '../../controllers/todo/todoPages'


router.get('/:userId', todoPagesController.getAllUserTodosPages)
router.post('/:userId', todoPagesController.createTodoPage)
router.delete('/:userId', todoPagesController.deleteAllTodoPages)


module.exports = router