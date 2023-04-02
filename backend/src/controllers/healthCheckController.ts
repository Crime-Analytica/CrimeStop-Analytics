import { Request, Response } from 'express'
import prisma from '../utils/prismaInstance'
import moment from 'moment'
import { logError } from '../services/loggerManager'
import { PrismaClient } from '@prisma/client'
import { Server } from 'socket.io'

async function checkDatabaseHealth (prisma: PrismaClient): Promise<boolean> {
  try {
    await prisma.$connect()
    await await prisma.$queryRaw`SELECT * FROM "Report"`
    return true
  } catch (error) {
    console.error('Database health check failed:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

const messagingServiceHealth = async (): Promise<boolean> => {
  try {
    const io = new Server()
    await io.in('healthcheck').fetchSockets()
    return true
  } catch (error) {
    console.error('Socket.IO health check failed:', error)
    return false
  }
}

const healthCheck = async (req: Request, res: Response) => {
  const databaseHealthy = await checkDatabaseHealth(prisma)
  const messagingServiceHealthy = await messagingServiceHealth()

  const healthCheckResponse = {
    uptime: process.uptime(),
    database: databaseHealthy ? 'OK' : 'NOT OK',
    messagingService: messagingServiceHealthy ? 'OK' : 'NOT OK',
    responseTime: process.hrtime(),
    timeStamp: moment().format('MMMM Do YYYY, h:mm:ss a')
  }

  try {
    res.send(healthCheckResponse)
  } catch (error) {
    const errorObject = error as Error
    const errorMessage = errorObject.message !== '' ? errorObject.message : 'Unknown error'
    void logError(`Call to health check endpoint failed with error: ${errorMessage}`)

    healthCheckResponse.database = 'ERROR'
    healthCheckResponse.messagingService = 'ERROR'

    return res.status(503).send(healthCheckResponse)
  } finally {
    await prisma.$disconnect()
  }
}

export default healthCheck
