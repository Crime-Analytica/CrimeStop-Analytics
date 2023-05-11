import { expect, test, vi } from 'vitest'
import { createUser } from '../../../helpers/userHelpers'
import prisma from '../../../utils/__mocks__/prismaInstance'

vi.mock('../../../utils/prismaInstance.ts')

test('createUser should return the generated user', async () => {
  const newUser = { email: 'user@prisma.io', username: 'Prisma Fan', password: '12345678' }
  const expectedUser = { ...newUser, id: '1', createdAt: expect.any(Date), role: 'civlian' }
  prisma.civilian.create.mockResolvedValue({ ...newUser, id: '1', createdAt: new Date(), role: 'civlian' })
  const user = await createUser(newUser.username, newUser.email, newUser.password)
  expect(user).toEqual(expectedUser)
})
