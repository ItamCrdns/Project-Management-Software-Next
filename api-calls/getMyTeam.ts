import { type DataCountPages } from '@/interfaces/DataCountPages.interface'
import { type ApiResponse } from '@/interfaces/apiResponse'
import { type Employee } from '@/interfaces/employee'
import paginatedFetcher from '@/utility/paginatedFetcher'

export const getMyTeam = async (page: string, pageSize: string): Promise<ApiResponse<DataCountPages<Employee>>> => {
  return await paginatedFetcher('Employee/my-team', page, pageSize)
}
