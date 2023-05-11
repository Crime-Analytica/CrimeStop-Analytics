import { Router } from 'express'
import getReports from '../controllers/admin/report'
import getDistressSignals from '../controllers/admin/distressSignals'
import postCriminals from '../controllers/admin/postCriminals'
const router = Router()

router.post('/add-criminals', postCriminals)
router.get('/get-reports', getReports)
router.get('/get-distressSignals', getDistressSignals)

export default router
