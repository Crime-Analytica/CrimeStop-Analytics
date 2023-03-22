import { Router } from 'express'
import signIn from '../controllers/auth/signIn'
import signUp from '../controllers/auth/signUp'
// import { protectRoute } from '../middleware/protectRoutes'

const router = Router()

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)

export default router
