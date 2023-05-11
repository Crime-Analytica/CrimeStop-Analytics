import { expect, test, vi } from 'vitest'
import { } from '../../../helpers/criminalHelpers'
import prisma from '../../../utils/__mocks__/prismaInstance'

vi.mock('../../../utils/prismaInstance.ts')

test('signInUser should return the authenticated user', async () => {
  const expectedCriminals = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      wantedFor: ['Robbery', 'Assault'],
      imageUrl: ['image1.jpg', 'image2.jpg']
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      wantedFor: ['Fraud'],
      imageUrl: ['image3.jpg']
    }
  ]
  prisma.criminal.findMany.mockResolvedValue(expectedCriminals)

  const criminals = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      wantedFor: ['Robbery', 'Assault'],
      imageUrl: ['image1.jpg', 'image2.jpg']
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      wantedFor: ['Fraud'],
      imageUrl: ['image3.jpg']
    }
  ]

  expect(criminals).toEqual(expectedCriminals)
})
