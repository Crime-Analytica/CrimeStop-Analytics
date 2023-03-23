interface user {
  id: string
  email: string
  username?: string
  role: string | undefined
  badgeNumber?: string
  rank?: string
}

export default user
