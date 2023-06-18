import { Request, Response } from 'express'
import { performFacialRecognition } from '../../helpers/visaVaultHelpers'
import loadTrainedModel from './trainModel'

// Function to load images from Cloudinary

/**
 * @swagger
 * /api/visavault:
 *   post:
 *     summary: Perform facial recognition.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VisaVaultRequest'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VisaVaultResponse'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     VisaVaultRequest:
 *       type: object
 *       properties:
 *         cloudinaryUrl:
 *           type: string
 *           description: The URL of the image on Cloudinary.
 *           example: https://cloudinary.com/image.jpg
 *       required:
 *         - cloudinaryUrl
 *
 *     VisaVaultResponse:
 *       type: object
 *       properties:
 *         predictions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Prediction'
 *
 *     Prediction:
 *       type: object
 *       properties:
 *         label:
 *           type: number
 *           description: The label of the recognized face.
 *           example: John Doe
 *         confidence:
 *           type: number
 *           description: The confidence score of the recognition.
 *           example: 85.42
 *
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: The error message.
 *           example: Internal server error
 */

export const visaVault = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cloudinaryUrl } = req.body

    const recognizer = await loadTrainedModel()

    const predictions = await performFacialRecognition(cloudinaryUrl, recognizer)

    res.json({ predictions })
  } catch (error) {
    console.error('Error performing facial recognition:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
