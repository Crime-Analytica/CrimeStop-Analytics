import { Request, Response } from 'express'
import crimeStatsScraper from '../../services/crimeStatsScraper'

const getCrimeStats = async (_req: Request, res: Response): Promise<void> => {
  const stats = await crimeStatsScraper()
  res.json({ stats })
}

export default getCrimeStats
