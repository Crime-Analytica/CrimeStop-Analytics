import express, { json } from 'express'
import session from 'express-session'
import passport from 'passport'
import bodyParser from 'body-parser'
import xss from 'xss-clean'
import helmet from 'helmet'
import logger from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './src/configs/swagger/swagger'
import cors from 'cors'
import healthCheck from './src/controllers/healthCheckController'
import errorHandler from './src/middleware/errorHandler'
import { initialize } from './src/configs/passportConfig'
import prisma from './src/utils/prismaInstance'
import authRouter from './src/routers/authRouter'
import crimeStatsRouter from './src/routers/crimeStatsRouter'
import dotenv from 'dotenv'
import forumRouter from './src/routers/forumRouter'
import stayAlertRouter from './src/routers/stayAlertRouter'
import adminRouter from './src/routers/adminRouter'
import visaVault from './src/routers/visaVault'
import { logInfo } from './src/services/loggerManager'
import limiter from './src/utils/rateLimiting'
import { createCluster } from './src/services/cluster'

dotenv.config({ path: '.env' })
const app = express()
const port = Number(process.env.PORT) ?? 4000
app.set('port', isNaN(port) || port === 0 ? 8080 : port)

// Session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
)

// Passport
initialize(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(cors())
app.use(logger('dev'))
app.use(json({ limit: '2560kb' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Healthcheck
app.get('/health', healthCheck)

// xss-clean middleware to all routes
app.use(xss())

// Using helmet middleware
app.use(helmet())

// Rate limiting
app.use('/api/', limiter)

// Routes
app.use('/api', adminRouter)
app.use('/api', authRouter)
app.use('/api', crimeStatsRouter)
app.use('/api', forumRouter)
app.use('/api', stayAlertRouter)
app.use('/api', visaVault)

// Catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send({ status: 'failed' })
})

// Error handler
app.use(errorHandler)

const startServer = async () => {
  prisma.$connect()
    .then(() => {
      app.listen(port, () => {
        void logInfo(`Server ready at http://localhost:${port}`)
      })
    })
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

// Use cluster
createCluster(startServer)

export default app
