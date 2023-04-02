import User from './userInterface'

interface Police extends User {
  firstName: string
  lastName: string
  email: string
  password: string
  badgeNumber: string
  rank: string
  role: string
}

export default Police
