import { Request, Response } from 'express'
import passport from 'passport'

const currentUser = async (req: Request, res: Response) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err !== null || (user !== null)) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
    return res.json({ user })
  })(req, res)
}

export default currentUser
