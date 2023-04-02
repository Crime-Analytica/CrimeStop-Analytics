import { Router } from 'express'
import getReports from '../controllers/admin/report'
import getDistressSignals from '../controllers/admin/DistressSignals'
import postCriminals from '../controllers/admin/postCriminals'
const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     criminal:
 *       type: object
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *         - wantedFor
 *         - imageUrl
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the criminal
 *         firstName:
 *           type: string
 *           description: The first name of the criminal
 *         lastName:
 *           type: string
 *           description: The last name of the criminal
 *         wantedFor:
 *           type: array
 *           description: A list of crimes committed by the criminal
 *           items:
 *             type: string
 *             description: A specific crime committed by the criminal
 *         imageUrl:
 *           type: array
 *           description: A list of URLs pointing to pictures of the criminal
 *           items:
 *             type: string
 *             format: uri
 *       example:
 *         id: d5fE_asz
 *         firstName: Chris
 *         lastName: Coke
 *         wantedFor: [crime, stealing]
 *         imageUrl: [https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FChristopher_Coke&psig=AOvVaw2lYGbkv2H_3Owf7-p-KZuG&ust=1680387644038000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJDw6viZh_4CFQAAAAAdAAAAABAD]
 */

/**
 * @swagger
 * tags:
 *   name: criminals
 *   description: Admin is able to post criminal to database
 * /api/add-criminals:
 *   post:
 *     summary: Add a new criminal to the database
 *     tags: [criminal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/criminal'
 *     responses:
 *       201:
 *         description: Criminal added to the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/criminal'
 *       400:
 *         description: Unable to add criminal
 *       500:
 *         description: Internal server error
 */

router.post('/add-criminals', postCriminals)
router.get('/get-reports', getReports)
router.get('/get-distressSignals', getDistressSignals)

export default router
