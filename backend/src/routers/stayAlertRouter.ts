import { Router } from 'express'
import getCriminals from '../controllers/stayAlert/getCriminals'
import getMissingPersons from '../controllers/stayAlert/getMissingPerson'
import createMissingPersons from '../controllers/stayAlert/missingPersons'
import sendDistressSignal from '../controllers/stayAlert/panic'
import sendReport from '../controllers/stayAlert/report'
import { protectRoute } from '../middleware/authenticator'

const router = Router()

router.get('/get-missing-persons', protectRoute, getMissingPersons)
router.post('/create-missing-persons', protectRoute, createMissingPersons)
router.post('/send-report', protectRoute, sendReport)
router.post('/send-distress-signal', protectRoute, sendDistressSignal)
router.get('/getcriminals', protectRoute, getCriminals)

export default router
