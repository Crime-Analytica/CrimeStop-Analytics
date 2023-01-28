abstract class CustomError extends Error {
  abstract statusCode: number

  constructor (message: string) {
    super(message)

    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors (): Array<{ message: string, field?: string }>
}
export default CustomError
