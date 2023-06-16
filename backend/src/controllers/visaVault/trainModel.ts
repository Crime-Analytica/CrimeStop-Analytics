import cv, { Mat, FaceRecognizer } from 'opencv4nodejs-prebuilt-install'
import { loadImageFromCloudinary } from '../../helpers/visaVaultHelpers'

const loadTrainedModel = async (): Promise<FaceRecognizer> => {
  const cloudinaryUrls = [
    'YOUR_CLOUDINARY_IMAGE_URL_1',
    'YOUR_CLOUDINARY_IMAGE_URL_2'
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
