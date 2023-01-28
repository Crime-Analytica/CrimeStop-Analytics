import { Router } from 'express'
import getForum from '../controllers/forum/forum'
import { protectRoute } from '../middleware/protectRoutes'

const router = Router()

router.get('/forum', protectRoute, getForum)
export default router
