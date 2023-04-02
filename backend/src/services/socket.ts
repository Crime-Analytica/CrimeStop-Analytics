import { Server } from 'socket.io'
import http from 'http'

let io: Server

function initializeSocket (server: http.Server) {
  io = new Server(server, {
    cors: {
      origin: '*'
    }
  })
}

export { initializeSocket, io }
