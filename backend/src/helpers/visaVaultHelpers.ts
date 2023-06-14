import cv, { Mat, Rect, FaceRecognizer } from 'opencv4nodejs-prebuilt'
import axios from 'axios'

export const loadImageFromCloudinary = async (cloudinaryUrl: string): Promise<Mat> => {
  const response = await axios.get<ArrayBuffer>(cloudinaryUrl, {
    responseType: 'arraybuffer'
  })
  const imageBuffer = Buffer.from(response.data)
  const imageMat = cv.imdecode(imageBuffer, cv.IMREAD_GRAYSCALE)
  return imageMat
}

// Function to perform facial recognition
export const performFacialRecognition = async (
  cloudinaryUrl: string,
  recognizer: FaceRecognizer
): Promise<Array<{ label: number, confidence: number }>> => {
  const imageMat = await loadImageFromCloudinary(cloudinaryUrl)

  const faceClassifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_DEFAULT)
  const { objects } = faceClassifier.detectMultiScaleWithRejectLevels(imageMat)

  const faces: Rect[] = objects

  const predictions: Array<{ label: number, confidence: number }> = []
  for (const faceRect of faces) {
    const faceRegion = imageMat.getRegion(faceRect)
    const { label, confidence } = recognizer.predict(faceRegion)
    predictions.push({ label, confidence })
  }

  return predictions
}
