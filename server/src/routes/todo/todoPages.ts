import express from 'express'

const router = express.Router()

import * as todoPagesController from '../../controllers/todo/todoPages'


router.get('/:userId', todoPagesController.getTheFirstTodoPage)
router.post('/:userId', todoPagesController.createTodoPage)
router.delete('/:userId', todoPagesController.deleteOldTodoPages)


module.exports = router