import prisma from '../../utils/prismaInstance'
import { io } from '../../../app'
import createPost from '../../helpers/postHelpers'

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
  socket.on('join-room', async (roomId, userId) => {
    void socket.join(roomId)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`User ${userId} joined room ${roomId}`)
    console.log(userId)

    const forum = await prisma.forum.findUnique({ where: { id: roomId } })
    if (forum == null) {
      io.to(roomId).emit('room-error', 'Forum not found')
      return
    }

    const civilian = await prisma.civilian.findUnique({ where: { id: userId } })
    if (civilian == null) {
      io.to(roomId).emit('room-error', 'Civilian not found')
      return
    }
    socket.on('create-post', async (content) => {
      console.log(roomId, userId)
      const post = createPost(content, roomId, userId)
      io.to(roomId).emit('new-post', post)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`post added ${content}`)
    })
  })
})
