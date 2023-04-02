import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import bcrypt from 'bcrypt'
import BadRequestError from '../errors/badRequestError'
import {
  findUserByEmail,
  findUserById,
  generateToken
} from '../helpers/userHelpers'

const JWT_SECRET = process.env.JWT_SECRET

const authenticateUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email)
  if (user == null) throw new BadRequestError('No user with that email')
  const passwordsMatch = await bcrypt.compare(password, user.password)
  if (!passwordsMatch) throw new BadRequestError('Password incorrect')
  const token = await generateToken(user)
  return { user, token }
}

const initialize = (passport: any) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, authenticateUser)
  )
  const opts: any = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = JWT_SECRET
  passport.use(
    new JwtStrategy(opts, async (payload: any, done: any) => {
      try {
        const user = await findUserById(payload.id)
        if (user == null) {
          return done(null, false)
        }
        return done(null, user)
      } catch (e) {
        return done(e)
      }
    })
  )
  passport.serializeUser((user: any) => user.id)
  passport.deserializeUser(async (id: string) => {
    const user = await findUserById(id)
    if (user == null) throw new Error('user not found')
    return user
  })
}

export { initialize }
