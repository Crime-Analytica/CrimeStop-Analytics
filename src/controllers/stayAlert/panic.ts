// import { Request, Response } from 'express'
// import { addDistressSignal } from '../../database/models/models'
// import { panic } from '../../services/emergencyServices'

// const sendDistressSignal = async (req: Request, res: Response) => {
//   const { location, message } = req.body
//   try {
//     const newDistressSignal = await addDistressSignal(location, message)
//     panic(location, message)
//     res.status(201).send(newDistressSignal)
//   } catch (err) {
//     res.status(400).send({ error: 'Unable to send distress signal' })
//   }
// }

// export default sendDistressSignal
