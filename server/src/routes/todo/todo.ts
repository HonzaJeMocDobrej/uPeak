import express from 'express'

const router = express.Router()

import * as todoController from '../../controllers/todo/todo'


router.get('/:id', todoController.getTodoById)
router.patch('/:id', todoController.patchTodo)
router.delete('/:id', todoController.deleteTodoById)


module.exports = router