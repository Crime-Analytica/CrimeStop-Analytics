import { Router } from 'express'
import addForum from '../controllers/forum/addForum'
import Forum from '../controllers/forum/forum'
import { protectRoute } from '../middleware/authenticator'

const router = Router()

router.post('/forum', protectRoute, Forum)
router.post('/add-forum', protectRoute, addForum)

export default router
