import express from 'express'

const router = express.Router()

import * as notesController from '../../controllers/notes/notes'

router.get('/:userId', notesController.getAllNotes)
router.get('/first/:userId', notesController.getTheFirstNote)
router.post('/:userId', notesController.createNotes)
router.post('/search/:userId', notesController.searchNotes)
router.delete('/:userId', notesController.deleteAllNotes)


module.exports = router