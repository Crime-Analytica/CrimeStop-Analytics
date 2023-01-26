import { Router } from 'express'
import multer from 'multer'
import getMissingPersons from '../controllers/stayAlert/missingPersons'
// import { protectRoute } from '../middleware/protectRoutes'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = Router()

router.post('/missing-persons', upload.single('image'), getMissingPersons)
export default router
