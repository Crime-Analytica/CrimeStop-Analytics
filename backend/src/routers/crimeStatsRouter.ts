import { Router } from 'express'
import getCrimeStats from '../controllers/crimeStats/crimeStats'
import { protectRoute } from '../middleware/authenticator'

const router = Router()

router.get('/crime-stats', protectRoute, getCrimeStats)
export default router
