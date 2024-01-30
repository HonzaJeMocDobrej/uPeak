import express from 'express'

const router = express.Router()

import * as groupsController from '../../controllers/todo/groups'


router.get('/:selectedPageId', groupsController.getAllGroups)
router.post('/:selectedPageId', groupsController.createGroup)
router.delete('/:selectedPageId', groupsController.deleteAllGroups)


module.exports = router