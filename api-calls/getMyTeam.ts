import { type DataCountPages } from '@/interfaces/DataCountPages.interface'
import { type ApiResponse } from '@/interfaces/apiResponse'
import { type Employee } from '@/interfaces/employee'
import { IFilterProperties } from '@/interfaces/props/IFilter'
import fetcher from '@/utility/fetcher'

export const getMyTeam = async (
  params: IFilterProperties
): Promise<ApiResponse<DataCountPages<Employee>>> => {
  const queryParams = new URLSearchParams(Object.entries(params)).toString()
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}Employee/my-team?${queryParams}`

  const { data, status } = await fetcher<DataCountPages<Employee>>(apiUrl)

  return {
    data,
    status
  }
}
