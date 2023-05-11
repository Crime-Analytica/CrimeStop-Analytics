import { expect, test, vi } from 'vitest'
import { createForum } from '../../../helpers/forumHelpers'
import prisma from '../../../utils/__mocks__/prismaInstance'

vi.mock('../../../utils/prismaInstance.ts')

test('signInUser should return the authenticated user', async () => {
  const addForum = { id: 1, title: 'forum 1', description: 'crime talk', ownerId: '2', created_at: expect.any(Date), updated_at: expect.any(Date) }
  prisma.forum.create.mockResolvedValue(addForum)

  const forum = await createForum(addForum.title, addForum.description, addForum.ownerId)

  expect(forum).toEqual(addForum)
})
