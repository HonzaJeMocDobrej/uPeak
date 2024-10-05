import express from 'express'

const router = express.Router()
import * as notificationsController from '../../controllers/notifications/notifications'

router.get('/:userId/:id', notificationsController.getNotificationById)
router.get('/:userId', notificationsController.getNotifications)
router.post('/:userId', notificationsController.createNotifications)
router.post('/notes/:userId', notificationsController.createNoteNotification)
router.post('/todos/:userId', notificationsController.createTodoNotification)
router.post('/pomodoro/:userId', notificationsController.createPomodoroNotification)
router.patch('/:id', notificationsController.patchNotificationById)

module.exports = router