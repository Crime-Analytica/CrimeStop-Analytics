import express, { json } from 'express'
import session from 'express-session'
import passport from 'passport'
import bodyParser from 'body-parser'
import http from 'http'
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
import { initializeSocket } from './src/services/socket'
import { logInfo } from './src/services/loggerManager'

dotenv.config({ path: '.env' })

const app = express()
const server = http.createServer(app)

const port = Number(process.env.PORT) ?? 4000
app.set('port', isNaN(port) || port === 0 ? 8080 : port)

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
)

// socket.io
initializeSocket(server)

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

// Routes
app.use('/api', adminRouter)
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

prisma.$connect()
  .then(() => {
    server.listen(port, () => {
      void logInfo(`Server ready at http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

export default server
