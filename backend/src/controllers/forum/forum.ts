// import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
// import http from 'http'
// import { Server } from 'socket.io'
// import app from '../../../app'

// const server = http.createServer(app)
// const io = new Server(server)
// const prisma = new PrismaClient()

const getForum = (_req: Request, res: Response) => {
  // io.on('connection', (socket) => {
  //   console.log('a user connected')

  //   socket.on('join_forum', async (forumId) => {
  //     // Retrieve forum and posts from database
  //     const forum = await prisma.forum.findUnique({ where: { id: forumId }, include: { posts: true } })
  //     if (forum == null) {
  //       socket.emit('error', 'Forum not found')
  //       return
  //     }

  //     // Join the forum room
  //     socket.join(`forum_${forum.id}`)

  //     // Send forum data to the client
  //     socket.emit('forum_data', forum)

  //     // Send posts to the client
  //     socket.emit('posts_data', forum.posts)

  //     console.log(`user joined forum ${forumId}`)
  //   })

  //   socket.on('leave_forum', (forumId) => {
  //     // Leave the forum room
  //     void socket.leave(`forum_${forumId}`)

  //     console.log(`user left forum ${forumId}`)
  //   })

  //   socket.on('new_post', async ({ forumId, content }) => {
  //     // Retrieve forum and author from database
  //     const forum = await prisma.forum.findUnique({ where: { id: forumId } })
  //     const author = await prisma.civilian.findUnique({ where: { id: socket.userId } })
  //     if (forum == null || (author == null)) {
  //       socket.emit('error', 'Forum or author not found')
  //       return
  //     }

  //     // Create new post and add it to the forum
  //     const post = await prisma.post.create({ data: { content, author: { connect: { id: author.id } }, forum: { connect: { id: forum.id } } } })
  //     forum.posts.push(post)

  //     // Send new post to all clients in the forum room
  //     io.to(`forum_${forumId}`).emit('new_post', post)

  //     console.log(`new post in forum ${forumId}`)
  //   })

  //   socket.on('disconnect', () => {
  //     console.log('a user disconnected')
  //   })
  // })
}

export default getForum
