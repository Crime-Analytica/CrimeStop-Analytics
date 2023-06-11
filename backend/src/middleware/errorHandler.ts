import { Request, Response } from 'express'

const handleError = (error: Error, req: Request, res: Response) => {
  const errorResponse = {
    message: error.message,
    status: 400
  }

  return res.status(400).send(errorResponse)
}

export default handleError
