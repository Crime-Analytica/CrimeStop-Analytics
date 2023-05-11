import { expect, test, vi } from 'vitest'
import { missingPersons } from '../../../helpers/missingPersonHelpers'
import prisma from '../../../utils/__mocks__/prismaInstance'

vi.mock('../../../utils/prismaInstance.ts')

test('signInUser should return the authenticated user', async () => {
  const missing = { id: '1', firstName: 'John', lastName: 'brown', age: 23, lastSeen: 'kingston', dateMissing: '2/23/2023', imageUrl: 'image.jpeg', civilianId: '1', createdAt: expect.any(Date) }
  prisma.missingPerson.create.mockResolvedValue(missing)

  const missingPerson = await missingPersons(missing.firstName, missing.lastName, missing.age, missing.lastSeen, missing.dateMissing, missing.imageUrl, missing.civilianId)

  expect(missingPerson).toEqual(missing)
})
