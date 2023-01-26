import { Request, Response } from 'express'
import { addMissingPersons } from '../../database/models/models'
import app from '../../../app'
import http from 'http'
import { Server } from 'socket.io'
import cloudinary from 'cloudinary'
import streamifier from 'streamifier'

const server = http.createServer(app)
const io = new Server(server)
cloudinary.config({
  cloud_name: 'dwhs4luwi',
  api_key: '581411898773423',
  api_secret: 'VVF69WiveyBqdA1syQb48eIZ6Mw'
})
// eslint-disable-next-line @typescript-eslint/no-floating-promises, n/handle-callback-err
cloudinary.v2.api.ping(function (error, result) { console.log(result) })
const getMissingPersons = async (req: Request, res: Response) => {
  console.log('Request Body:', req.body) // Log entire request body
  const { firstName, lastName, lastSeen } = req.body

  if (req.file != null) {
    let imageUrl: string
    const upload = cloudinary.v2.uploader.upload_stream({ folder: 'missing' }, (error: any, result: any) => {
      if (error != null) {
        res.status(400).send({ error: 'Unable to upload image to Cloudinary' })
      } else {
        imageUrl = result.secure_url.toString()
      }
    })
    streamifier.createReadStream(req.file.buffer).pipe(upload)
    upload.on('finish', async () => {
      try {
        const newMissingPersons = await addMissingPersons(firstName, lastName, lastSeen, imageUrl)
        io.emit('new missing person posted', newMissingPersons)
        res.status(201).send(newMissingPersons)
      } catch (err) {
        res.status(400).send({ error: 'Unable to add missing person' })
      }
    })
  }
}

export default getMissingPersons
