import { Router } from 'express'
import getReports from '../controllers/admin/report'
import getDistressSignals from '../controllers/admin/distressSignals'
import postCriminals from '../controllers/admin/postCriminals'
import { checkRole } from '../middleware/authenticator'

const router = Router()

router.post('/add-criminals', checkRole, postCriminals)
router.get('/get-reports', checkRole, getReports)
router.get('/get-distressSignals', checkRole, getDistressSignals)

export default router
