import { expect, test, vi } from 'vitest'
import { findUserByEmail } from '../../../helpers/userHelpers'
import prisma from '../../../utils/__mocks__/prismaInstance'

vi.mock('../../../utils/prismaInstance.ts')

test('signInUser should return the authenticated user', async () => {
  const existingUser = { email: 'user@prisma.io', password: '12345678', username: 'hello' }
  const expectedUser = { ...existingUser, id: '1', createdAt: expect.any(Date), role: 'civilian' }
  prisma.civilian.findUnique.mockResolvedValue({ ...expectedUser })

  const user = await findUserByEmail(existingUser.email)

  expect(user).toEqual(expectedUser)
})
