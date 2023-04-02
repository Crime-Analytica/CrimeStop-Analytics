import { Router } from 'express'
import getCriminals from '../controllers/stayAlert/getCriminals'
import getMissingPersons from '../controllers/stayAlert/getMissingPerson'
import createMissingPersons from '../controllers/stayAlert/missingPersons'
import sendDistressSignal from '../controllers/stayAlert/panic'
import sendReport from '../controllers/stayAlert/report'
// import { protectRoute } from '../middleware/protectRoutes'

const router = Router()

/**
 * @swagger
 * definitions:
 *   MissingPerson:
 *     type: object
 *     required:
 *       - firstName
 *       - lastName
 *       - lastSeen
 *       - age
 *       - dateMissing
 *       - civilianId
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       lastSeen:
 *         type: string
 *       age:
 *         type: number
 *       dateMissing:
 *         type: string
 *       imageUrl:
 *         type: string
 *       civilianId:
 *         type: string
 */

/**
 * @swagger
 * /api/create-missing-persons:
 *   post:
 *     summary: Create a new missing person record
 *     description: Use this route to create a new missing person record.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Missing person object that needs to be added to the database
 *         required: true
 *         schema:
 *           $ref: '#/definitions/MissingPerson'
 *     responses:
 *       201:
 *         description: Created missing person object
 *         schema:
 *           $ref: '#/definitions/MissingPerson'
 *       400:
 *         description: Bad request
 *     security:
 *       - bearerAuth: []
 */

router.get('/get-missing-persons', getMissingPersons)
router.post('/create-missing-persons', createMissingPersons)
router.post('/send-report', sendReport)
router.post('/send-distress-signal', sendDistressSignal)
router.get('/getcriminals', getCriminals)

export default router
