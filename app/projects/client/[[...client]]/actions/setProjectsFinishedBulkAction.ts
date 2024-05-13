'use server'
import { handleSetProjectsFinishedBulk } from '@/api-calls/post/setProjectsFinishedBulk'

export const setProjectsFinishedBulkAction = async (projectIds: number[]) => {
  const res = await handleSetProjectsFinishedBulk(projectIds)

  return res
}
