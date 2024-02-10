import express from 'express'

const router = express.Router()

import * as todosController from '../../controllers/todo/todos'


router.get('/:groupId', todosController.getAllTodos)
router.post('/:groupId', todosController.createTodo)
router.delete('/:groupId', todosController.deleteAllTodos)


module.exports = router