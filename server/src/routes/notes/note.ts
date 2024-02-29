import express from 'express'

const router = express.Router()

import * as noteController from '../../controllers/notes/note'
import { uploadNotesImg } from '../../config/multer'


router.get('/:userId/:id', noteController.getNoteById)
router.patch('/:id', noteController.patchNote)
router.patch('/img/:id', uploadNotesImg, noteController.patchNoteImg)
router.delete('/:userId/:id', noteController.deleteNoteById)


module.exports = router