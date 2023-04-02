import prisma from '../../utils/prismaInstance'
import { Request, Response } from 'express'
import { io } from '../../services/socket'

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
      const post = await prisma.post.create({
        data: {
          content,
          forumId: roomId,
          authorId: userId
        },
        include: {
          author: true
        }
      })

      io.to(roomId).emit('new-post', post)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`post added ${content}`)
    })
  })
})
const Forum = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.findMany()
    res.status(200).send(post)
  } catch (error) {

  }
}

export default Forum
