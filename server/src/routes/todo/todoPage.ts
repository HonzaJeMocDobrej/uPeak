import express from 'express'

const router = express.Router()

import * as todoPageController from '../../controllers/todo/todoPage'


router.get('/:id', todoPageController.getUserTodoPageById)
router.patch('/:id', todoPageController.patchTodoPage)
router.delete('/:id', todoPageController.deleteTodoPage)


module.exports = router