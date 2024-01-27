import express from 'express'

const router = express.Router()
import * as statsController from '../controllers/stats/stats'

router.get('/:id', statsController.getStatsById)
router.post('/:id', statsController.createStats)
router.patch('/:id', statsController.patchStats)
router.delete('/:id', statsController.deleteStats)

module.exports = router