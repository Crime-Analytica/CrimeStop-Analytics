import { Router } from 'express'
import { getReports, deleteReport } from '../controllers/admin/report'
import { getDistressSignals, deleteDistressSignal } from '../controllers/admin/distressSignals'
import { postCriminals, deleteCriminals } from '../controllers/admin/postCriminals'
import { checkRole } from '../middleware/authenticator'

const router = Router()

router.post('/add-criminals', checkRole, postCriminals)
router.put('/add-criminals/:id', checkRole, deleteCriminals)
router.get('/get-reports', checkRole, getReports)
router.put('/delete-report/:id', checkRole, deleteReport)
router.get('/get-distressSignals', checkRole, getDistressSignals)
router.put('/delete-distressSignal/:id', checkRole, deleteDistressSignal)
export default router
