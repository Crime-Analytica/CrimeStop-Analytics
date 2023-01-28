import { Router } from 'express'
import getCriminal from '../controllers/admin/getCriminals'
import { protectRoute, CheckRole } from '../middleware/protectRoutes'

const router = Router()

router.post('/add-criminals', protectRoute, CheckRole, getCriminal)
export default router
