import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

const getFacialRecognition = async (req: Request, res: Response) => {
  const criminals = await prisma.criminal.findMany()

  const imageUrls = criminals.map(criminal => criminal.imageUrl) // get all the image urls from the criminals
  const imagesData: any = []
  imageUrls.forEach(urls => {
    urls.forEach(async url => {
      try {
        const response = await axios.get(url, { responseType: 'arraybuffer' })
        imagesData.push(response.data)
      } catch (error) {
        console.log(`Error with url ${url}`)
      }
    })
  })
}

export default getFacialRecognition
