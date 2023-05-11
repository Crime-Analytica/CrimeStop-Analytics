import { expect, test, vi } from 'vitest'
import { createReport } from '../../../helpers/reportHelpers'
import prisma from '../../../utils/__mocks__/prismaInstance'

vi.mock('../../../utils/prismaInstance.ts')

test('signInUser should return the authenticated user', async () => {
  const reporting = { id: '1', reportType: 'crime', message: 'something happen at x', civilianId: '1', createdAt: expect.any(Date) }
  prisma.report.create.mockResolvedValue(reporting)

  const reports = await createReport(reporting.reportType, reporting.message, reporting.civilianId)

  expect(reports).toEqual(reporting)
})
