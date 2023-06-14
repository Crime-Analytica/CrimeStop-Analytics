import { Request, Response } from 'express'
import { performFacialRecognition } from '../../helpers/visaVaultHelpers'
import loadTrainedModel from './trainModel'

// Function to load images from Cloudinary

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
