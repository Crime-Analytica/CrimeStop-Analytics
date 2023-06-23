import { Router } from 'express'
import signIn from '../controllers/auth/signIn'
import { signUpCivilian } from '../controllers/auth/signUp'

const router = Router()

router.post('/sign-in', signIn)
// router.post('/sign-up-Law', signUpLawEnforment)
router.post('/sign-up-Civilian', signUpCivilian)

export default router
