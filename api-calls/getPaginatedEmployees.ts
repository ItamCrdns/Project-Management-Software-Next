import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type Employee } from '@/interfaces/employee'

const getPaginatedEmployees = async (
  companyId: number,
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Employee> | null, status: number }> => {
  const url = new URL(
    process.env.NEXT_PUBLIC_API_URL + `Company/${companyId}/employees`
  )
  url.searchParams.set('page', page)
  url.searchParams.set('pageSize', pageSize)

  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include', // Cookies
    cache: 'no-store'
  }

  const res = await fetch(url, requestOptions)

  if (!res.ok) {
    return {
      data: null,
      status: res.status
    }
  }

  if (res.ok) {
    return {
      data: await res.json(),
      status: res.status
    }
  }

  return {
    data: null,
    status: res.status
  }
}
export default getPaginatedEmployees
