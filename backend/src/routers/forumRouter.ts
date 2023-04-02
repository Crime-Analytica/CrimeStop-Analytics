import { Router } from 'express'
import addForum from '../controllers/forum/addForum'
import Forum from '../controllers/forum/forum'
// import { protectRoute, CheckRole } from '../middleware/protectRoutes'

const router = Router()

router.post('/forum', Forum)
router.post('/add-forum', addForum)

export default router
