import { type Issue } from '@/interfaces/Issue'
import { type ApiResponse } from '@/interfaces/apiResponse'
import { type Data } from '@/utility/api/DataParticipantOwner.interface'
import fetcher from '@/utility/fetcher'

export const getIssue = async (issueId: string, taskId: string, projectId: string): Promise<ApiResponse<Data<Issue>>> => {
  return await fetcher(`${process.env.NEXT_PUBLIC_API_URL}Issue/${issueId}?taskId=${taskId}&projectId=${projectId}`)
}
