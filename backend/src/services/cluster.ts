import cluster from 'cluster'
import os from 'os'
import { logInfo } from './loggerManager'

const numCPUs = os.cpus().length

export const createCluster = (startServerCallback: () => void): void => {
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`)

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
      void logInfo(`Master ${process.pid} is running with ${numCPUs ?? 0} CPUs`)
      cluster.fork()
    })
  } else {
    void logInfo(`Worker ${process.pid} started`)
    startServerCallback()
  }
}
