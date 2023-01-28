import { Router } from 'express'
import getCrimeStats from '../controllers/crimeStats/crimeStats'
// import { protectRoute } from '../middleware/protectRoutes'

const router = Router()

router.get('/crime-stats', getCrimeStats)
export default router
