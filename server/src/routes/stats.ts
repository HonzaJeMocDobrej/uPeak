import express from 'express'

const router = express.Router()
import * as statsController from '../controllers/stats/stats'

router.get('/:userId', statsController.getStatsById)
router.post('/:userId', statsController.createStats)
router.patch('/:userId', statsController.patchStats)
router.delete('/:userId', statsController.deleteStats)

module.exports = router