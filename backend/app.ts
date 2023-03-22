import express, { json } from 'express'
import session from 'express-session'
import passport from 'passport'
import bodyParser from 'body-parser'
import logger from 'morgan'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import healthCheck from './src/controllers/healthCheckController'
import errorHandler from './src/middleware/errorHandler'
import { initialize } from './src/configs/passportConfig'
import authRouter from './src/routers/authRouter'
import crimeStatsRouter from './src/routers/crimeStatsRouter'
import dotenv from 'dotenv'
import forumRouter from './src/routers/forumRouter'
import { logInfo, logError } from './src/services/loggerManager'
import stayAlertRouter from './src/routers/stayAlertRouter'
dotenv.config({ path: '.././backend/.env' })

const prisma = new PrismaClient()

const app = express()
const port = 80 | Number(process.env.PORT)

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
)

async function checkConnection () {
  try {
    await prisma.$connect()
    void logInfo('Connected to the database!')
  } catch (error: any) {
    void logError(error.toString())
  }
}
checkConnection()
  .catch((error) => {
    void logError(error.toString())
  })

// Passport
initialize(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

app.use(logger('dev'))
app.use(json({ limit: '2560kb' }))
app.use(bodyParser.json()) // parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })) // parse URL-encoded request bodies

// Healthcheck
app.get('/health', healthCheck)

// Routes
app.use('/api', authRouter)
app.use('/api', crimeStatsRouter)
app.use('/api', forumRouter)
app.use('/api', stayAlertRouter)

// Catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send({ status: 'failed' })
})

// Error handler
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`)
})

export default app
