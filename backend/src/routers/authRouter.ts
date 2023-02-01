import { Router } from 'express'
import signIn from '../controllers/auth/signIn'
import signUp from '../controllers/auth/signUp'
import currentUser from '../controllers/auth/currentUser'
import signOut from '../controllers/auth/signOut'
import { protectRoute } from '../middleware/protectRoutes'

const router = Router()

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.get('/sign-out', signOut)
router.get('/current-user', protectRoute, currentUser)

export default router
