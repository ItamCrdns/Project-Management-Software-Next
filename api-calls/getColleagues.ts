import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type Employee } from '@/interfaces/employee'
import paginatedFetcher from '@/utility/paginatedFetcher'

const getColleagues = async (
  username: string,
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Employee> | null, status: number }> =>
  await paginatedFetcher(`Employee/${username}/colleagues`, page, pageSize)

export default getColleagues
