import express from 'express'

const router = express.Router()

import * as groupController from '../../controllers/todo/group'


router.get('/:id', groupController.getGroupById)
router.patch('/:id', groupController.patchGroup)
router.delete('/:id', groupController.deleteGroupById)


module.exports = router