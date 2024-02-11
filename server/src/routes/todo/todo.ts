import express from 'express'

const router = express.Router()

import * as todoController from '../../controllers/todo/todo'


router.get('/:id', todoController.getTodoById)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodoById)

router.delete('/submit/:id', todoController.submitTodo)


module.exports = router