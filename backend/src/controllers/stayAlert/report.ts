import { Request, Response } from 'express'
import { createReport } from '../../helpers/reportHelpers'
import { sendReportSchema } from '../../validations'
/**
 * @swagger
 * /api/reports:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Stay Alert
 *     summary: Send a report.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReportRequest'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReportResponse'
 *
 * components:
 *   schemas:
 *     ReportRequest:
 *       type: object
 *       properties:
 *         reportType:
 *           type: string
 *           description: The type of the report.
 *           example: Suspicious Activity
 *         message:
 *           type: string
 *           description: The message associated with the report.
 *           example: I witnessed suspicious activity near my house.
 *         civilianId:
 *           type: string
 *           description: The ID of the civilian sending the report.
 *           example: ABC123
 *     ReportResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the report.
 *           example: 1
 *         reportType:
 *           type: string
 *           description: The type of the report.
 *           example: Suspicious Activity
 *         message:
 *           type: string
 *           description: The message associated with the report.
 *           example: I witnessed suspicious activity near my house.
 *         civilianId:
 *           type: string
 *           description: The ID of the civilian sending the report.
 *           example: ABC123
 */

const sendReport = async (req: Request, res: Response) => {
  const { reportType, message, civilianId } = sendReportSchema.parse(req.body)

  try {
    const newReport = await createReport(reportType, message, civilianId)
    res.status(201).send(newReport)
  } catch (err) {
    res.status(400).send({ error: 'Unable to send report' })
  }
}

export default sendReport
