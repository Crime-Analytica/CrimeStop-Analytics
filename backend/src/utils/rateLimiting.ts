import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  message: 'Too many requests, please try again later'
})

export default limiter
