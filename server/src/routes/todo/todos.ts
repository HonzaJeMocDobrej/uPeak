import express from 'express'

const router = express.Router()

import * as todosController from '../../controllers/todo/todos'


router.get('/:selectedPageId', todosController.getAllTodos)
router.post('/:selectedPageId', todosController.createTodo)
router.delete('/:selectedPageId', todosController.deleteAllTodos)


module.exports = router