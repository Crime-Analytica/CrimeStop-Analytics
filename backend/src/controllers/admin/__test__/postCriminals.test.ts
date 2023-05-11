import { expect, test, vi } from 'vitest'
import { addCriminal } from '../../../helpers/criminalHelpers'
import prisma from '../../../utils/__mocks__/prismaInstance'

vi.mock('../../../utils/prismaInstance.ts')

test('signInUser should return the authenticated user', async () => {
  const criminals = { id: '1', firstName: 'dudos', lastName: 'coke', wantedFor: ['drug', 'shooting'], imageUrl: ['image.jpeg', 'image.png'] }
  prisma.criminal.create.mockResolvedValue(criminals)

  const getCriminal = await addCriminal(criminals.firstName, criminals.lastName, criminals.wantedFor, criminals.imageUrl)

  expect(getCriminal).toEqual(criminals)
})
