import { expect, test, vi } from 'vitest'
import { createDistressSignal } from '../../../helpers/distressSignalHelpers'
import prisma from '../../../utils/__mocks__/prismaInstance'

vi.mock('../../../utils/prismaInstance.ts')

test('signInUser should return the authenticated user', async () => {
  const panic = { id: '1', latitude: 198, longitude: 77, message: 'help', civilianId: '1', createdAt: expect.any(Date) }
  prisma.distressSignal.create.mockResolvedValue(panic)

  const signal = await createDistressSignal(panic.latitude, panic.longitude, panic.message, panic.civilianId)

  expect(signal).toEqual(panic)
})
