import { Router } from 'express'
import multer from 'multer'
import getMissingPersons from '../controllers/stayAlert/missingPersons'
import sendDistressSignal from '../controllers/stayAlert/panic'
import sendReport from '../controllers/stayAlert/report'
import { protectRoute } from '../middleware/protectRoutes'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = Router()

router.post('/missing-persons', upload.single('image'), getMissingPersons)
router.post('/sendreport', protectRoute, sendReport)
router.post('/sendDistressSignal', sendDistressSignal)

export default router
