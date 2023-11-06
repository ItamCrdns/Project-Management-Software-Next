import getCompanyEmployees from '@/api-calls/getCompanyEmployees'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type Employee } from '@/interfaces/employee'

interface EmployeeFetcherProps {
  companyId: string
  searchValue?: string
  page: string
}

const fetchEmployees = async ({
  companyId,
  searchValue,
  page
}: EmployeeFetcherProps): Promise<DictionaryResponse<Employee> | string> => {
  if (searchValue != null) {
    try {
      const response = await getCompanyEmployees(
        `${process.env.NEXT_PUBLIC_API_URL}Company/${companyId}/employees/search/${searchValue}?page=${page}&pageSize=5`
      )
      return response.data ?? 'Something went wrong'
    } catch (error) {
      const errorMessage = (error as string).toString() // Convert the error from object to string for proper error handling
      return errorMessage
    }
  } else {
    try {
      const response = await getCompanyEmployees(
        `${process.env.NEXT_PUBLIC_API_URL}Company/${companyId}/employees?page=${page}&pageSize=5`
      )
      return response.data ?? 'Something went wrong'
    } catch (error: unknown) {
      const errorMessage = (error as string).toString() // Convert the error from object to string for proper error handling
      return errorMessage
    }
  }
}

export default fetchEmployees
