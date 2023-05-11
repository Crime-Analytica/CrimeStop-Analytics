import { expect, test, vi } from 'vitest'
import prisma from '../../../utils/__mocks__/prismaInstance'

vi.mock('../../../utils/prismaInstance.ts')

test('signInUser should return the authenticated user', async () => {
  const expectedMissingPersons =
  [
    {
      id: '1', firstName: 'John', lastName: 'Brown', age: 20, lastSeen: '5/06/2023', dateMissing: '07/8/2023', imageUrl: 'image.jpeg', civilianId: '1'
    }
  ]

  prisma.missingPerson.findMany.mockResolvedValue(expectedMissingPersons)

  const missingPersons =
  [
    {
      id: '1', firstName: 'John', lastName: 'Brown', age: 20, lastSeen: '5/06/2023', dateMissing: '07/8/2023', imageUrl: 'image.jpeg', civilianId: '1'
    }
  ]

  expect(missingPersons).toEqual(expectedMissingPersons)
})
