import { Router } from 'express'
import { visaVault } from '../controllers/visaVault/visaVault'

const router = Router()

router.post('/visa-vault', visaVault)

export default router
