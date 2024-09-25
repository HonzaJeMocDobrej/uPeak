import express from 'express'

const router = express.Router()
import * as achievementsController from '../../controllers/notifications/notifAchievements'

router.get('/:userId', achievementsController.getAchievements)
router.post('/:userId', achievementsController.createAchievements)
router.patch('/:userId', achievementsController.patchAchievements)
router.get('/notescount/:userId', achievementsController.getCreatedNotesCount)
router.patch('/count/:userId', achievementsController.addAchievementsCount)

module.exports = router