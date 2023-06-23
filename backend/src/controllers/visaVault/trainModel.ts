import cv, { Mat, FaceRecognizer } from 'opencv4nodejs-prebuilt-install'
import { loadImageFromCloudinary } from '../../helpers/visaVaultHelpers'

const loadTrainedModel = async (): Promise<FaceRecognizer> => {
  const cloudinaryUrls = [
    'https://res.cloudinary.com/dwhs4luwi/image/upload/v1682348348/wanted/jljr66rdmektnfdhpuhb.jpg',
    'https://res.cloudinary.com/dwhs4luwi/image/upload/v1681824039/wanted/jzsde6dsek2wapjrngsr.jpg'
  ]
  const labels = [0, 1]

  const images: Mat[] = []
  for (const url of cloudinaryUrls) {
    const image = await loadImageFromCloudinary(url)
    images.push(image)
  }

  const recognizer = new cv.LBPHFaceRecognizer()
  recognizer.train(images, labels)

  return recognizer
}

export default loadTrainedModel
