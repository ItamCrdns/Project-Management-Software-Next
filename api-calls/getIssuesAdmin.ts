import paginatedFetcher from '@/utility/paginatedFetcher'
import { type Issue } from '@/interfaces/Issue'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

// * Admin only endpoint
const getIssuesAdmin = async (
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Issue> | null, status: number }> =>
  await paginatedFetcher('Issue/all', page, pageSize)

export default getIssuesAdmin
