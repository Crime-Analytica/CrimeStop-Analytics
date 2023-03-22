import CustomError from './customError'
import { logError } from '../services/loggerManager'

class BadRequestError extends CustomError {
  statusCode = 400

  constructor (public message: string) {
    super(message)
    void logError(`BadRequestError: ${message}`)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors () {
    return [{ message: this.message }]
  }
}
export default BadRequestError
