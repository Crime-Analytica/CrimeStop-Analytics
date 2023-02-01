import { Request, Response } from 'express'

const signOut = (req: Request, res: Response) => {
  req.session.destroy((err: any) => {
    if (err !== null) {
      res.status(500).send({ error: 'An error occurred while signing out' })
    } else {
      res.status(200).send({ message: 'Successfully signed out' })
    }
  })
}

export default signOut
