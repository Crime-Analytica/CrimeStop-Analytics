import CustomError from './customError'

class BadRequestError extends CustomError {
  statusCode = 400

  constructor (public message: string) {
    super(message)

    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors () {
    return [{ message: this.message }]
  }
}
export default BadRequestError
