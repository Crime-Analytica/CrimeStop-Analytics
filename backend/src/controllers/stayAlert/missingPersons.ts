import { Request, Response } from 'express'
import { missingPersons } from '../../database/models/models'
import app from '../../../app'
import http from 'http'
import { Server } from 'socket.io'
import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'
import { PrismaClient } from '@prisma/client'
const server = http.createServer(app)
const io = new Server(server)

const prisma = new PrismaClient()
const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret
})
// eslint-disable-next-line @typescript-eslint/no-floating-promises, n/handle-callback-err
cloudinary.api.ping(function (error, result) { console.log(result) })
const getMissingPersons = async (req: Request, res: Response) => {
  console.log('Request Body:', req.body) // Log entire request body
  const { firstName, lastName, lastSeen, age, dateMissing } = req.body

  const Id = req.user as string
  const civilian = await prisma.civilian.findUnique({
    where: {
      id: Id
    }
  })

  const civilianId = civilian?.id

  if (req.file != null) {
    let imageUrl: string
    const upload = cloudinary.uploader.upload_stream({ folder: 'missing' }, (error: any, result: any) => {
      if (error != null) {
        res.status(400).send({ error: 'Unable to upload image to Cloudinary' })
      } else {
        imageUrl = result.secure_url.toString()
      }
    })
    streamifier.createReadStream(req.file.buffer).pipe(upload)
    upload.on('finish', async () => {
      try {
        if (civilianId !== undefined) {
          const newMissingPersons = await missingPersons(firstName, lastName, lastSeen, age, dateMissing, imageUrl, civilianId)
          io.emit('new missing person posted', newMissingPersons)
          res.status(201).send(newMissingPersons)
        }
      } catch (err) {
        res.status(400).send({ error: 'Unable to add missing person' })
      }
    })
  }
}

export default getMissingPersons
