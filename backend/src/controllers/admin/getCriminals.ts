import { Request, Response } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'
import { addCriminal } from '../../database/models/models'

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
const postCriminals = async (req: Request, res: Response) => {
  const { firstName, lastName, wantedFor } = req.body

  if (req.file != null) {
    let imageUrl: string
    const upload = cloudinary.uploader.upload_stream({ folder: 'wanted' }, (error: any, result: any) => {
      if (error != null) {
        res.status(400).send({ error: 'Unable to upload image to Cloudinary' })
      } else {
        imageUrl = result.secure_url.toString()
      }
    })
    streamifier.createReadStream(req.file.buffer).pipe(upload)
    upload.on('finish', async () => {
      try {
        const newCriminal = await addCriminal(firstName, lastName, wantedFor, imageUrl)
        res.status(201).send(newCriminal)
      } catch (err) {
        res.status(400).send({ error: 'Unable to add missing person' })
      }
    })
  }
}

export default postCriminals
