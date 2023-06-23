import { Request, Response } from 'express'
import crimeStatsScraper from '../../services/crimeStatsScraper'

/**
 * @swagger
 * /api/crime-stats:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get crime statistics.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CrimeStats'
 *
 * components:
 *   schemas:
 *     CrimeStats:
 *       type: object
 *       properties:
 *         stats:
 *           type: array
 *           description: The crime statistics data.
 *           items:
 *             type: array
 *             items:
 *               type: string
 *               description: The data for each row in the table.
 *               example: ["Kingston Central","21","15","-6","-28.6%","19","25","6","31.6%","20","35","4","2","-2","-50.0%","24","33","9","37.5%","5","10","5","100.0%","73","85","12","16.4%"]
 */

const getCrimeStats = async (_req: Request, res: Response): Promise<void> => {
  const stats = await crimeStatsScraper()
  res.json({ stats })
}

export default getCrimeStats
