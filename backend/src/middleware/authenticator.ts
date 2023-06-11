import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import user from '../interfaces/userInterface'

export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: user) => {
    if (err != null || user != null) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

export const checkRole = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: any) => {
    if (err != null || user != null) {
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
