import { Request, Response } from 'express'
import moment from 'moment'
import { logError } from '../services/loggerManager'

const healthCheck = (req: Request, res: Response) => {
  const healthCheckResponse = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: moment().toISOString()
  }
  try {
    res.send(healthCheckResponse)
  } catch (error) {
    if (error !== null) {
      let errorMessage: string
      if (error instanceof Error) {
        errorMessage = error.message
      } else {
        errorMessage = JSON.stringify(error)
      }
      void logError(`Call to health check endpoint failed with error '${errorMessage}'`)
      healthCheckResponse.message = errorMessage
      return res.status(503).send(healthCheckResponse)
    }
  }
}
export default healthCheck
