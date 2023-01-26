import { Request, Response } from 'express'
import CustomError from '../errors/customError'

const errorHandler = (err: Error, _req: Request, res: Response) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .send({ errors: err.serializeErrors() })
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  })
}

export default errorHandler
