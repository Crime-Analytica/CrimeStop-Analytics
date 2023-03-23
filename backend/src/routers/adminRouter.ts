import { Router } from 'express'
import getCriminal from '../controllers/admin/getCriminals'
import { CheckRole, protectRoute } from '../middleware/protectRoutes'
import getReports from '../controllers/admin/report'
import getDistressSignals from '../controllers/admin/DistressSignals'
const router = Router()

router.post('/add-criminals', CheckRole, getCriminal)
router.get('/getreports', protectRoute, getReports)
router.get('/getDistressSignals', CheckRole, getDistressSignals)

export default router
