import { Request, Response } from 'express'
import passport from 'passport'

export const protectRoute = (req: Request, res: Response, next: any) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err !== null || !(user !== null)) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

export const CheckRole = (req: Request, res: Response, next: any) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err !== null || user !== null) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
    if (user.role !== 'police-admin') {
      return res.status(401).json({
        message: 'Access Denied'
      })
    }
    req.user = user
    next()
  })(req, res, next)
}
