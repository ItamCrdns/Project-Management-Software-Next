import { OperationResult } from '@/interfaces/return/OperationResult'
import { postPatchCookieOptions } from '@/utility/cookieOptions'

export const handleSetProjectsFinishedBulk = async (
  projectIds: number[]
): Promise<OperationResult<number[]>> => {
  const url = new URL(
    process.env.NEXT_PUBLIC_API_URL + 'ProjectManagement/set/finished/bulk'
  )

  const res = await fetch(
    url,
    postPatchCookieOptions(JSON.stringify(projectIds), 'application/json')
  )

  return await res.json()
}
