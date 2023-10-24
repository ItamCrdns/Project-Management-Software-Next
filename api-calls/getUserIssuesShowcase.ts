import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type Issue } from '@/interfaces/Issue'
import paginatedFetcher from '@/utility/paginatedFetcher'

const getUserIssuesShowcase = async (
  username: string,
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Issue> | null, status: number }> =>
  await paginatedFetcher(`Employee/${username}/issues/showcase`, page, pageSize)

export default getUserIssuesShowcase
