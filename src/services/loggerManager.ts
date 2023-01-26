import winston, { format, createLogger, transports } from 'winston'

const {
  combine, timestamp, label, prettyPrint
} = format
const CATEGORY = 'Logger for CrimeStop Analytics'

const levels: winston.config.AbstractConfigSetLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}

const logger = createLogger({
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    prettyPrint()
  ),
  transports: [new transports.Console()]
})

const log = (message: string, level: keyof typeof levels = 'info'): void => {
  level = level as string
  // We don't want to log anything below "info" on production environment
  if (!(level in levels) || (process.env.NODE_ENV === 'production' && levels[level] > 2)) {
    return
  }
  logger.log({ level, message })
}

export const logError = async (message: string) => { log(message, 'error') }
export const logInfo = async (message: string) => { log(message, 'info') }
export const logWarning = async (message: string) => { log(message, 'warning') }
