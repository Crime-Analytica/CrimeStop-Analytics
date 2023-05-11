import { Request, Response } from 'express'
import { createForum } from '../../helpers/forumHelpers'
import { addForumSchema } from '../../validations/schemas/forumSchema'

const addForum = async (req: Request, res: Response) => {
  try {
    const { title, description, ownerId } = addForumSchema.parse(req.body)
    const forum = await createForum(title, description, ownerId)
    res.json(forum)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create forum' })
  }
}

export default addForum
