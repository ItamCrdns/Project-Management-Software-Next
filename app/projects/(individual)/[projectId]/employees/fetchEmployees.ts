import getProjectEmployees from '@/api-calls/getEmployeeProjects'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type Employee } from '@/interfaces/employee'

interface EmployeeFetcherProps {
  projectId: string
  searchValue?: string
  page: string
}

const fetchEmployees = async ({
  projectId,
  searchValue,
  page
}: EmployeeFetcherProps): Promise<DictionaryResponse<Employee> | string> => {
  if (searchValue != null) {
    try {
      const response = await getProjectEmployees(
        `Project/${projectId}/employees/search/${searchValue}`,
        page,
        '5'
      )
      return response.data ?? 'Something went wrong'
    } catch (error) {
      const errorMessage = (error as string).toString() // Convert the error from object to string for proper error handling
      return errorMessage
    }
  } else {
    try {
      const response = await getProjectEmployees(
        `Project/${projectId}/employees`,
        page,
        '5'
      )
      return response.data ?? 'Something went wrong'
    } catch (error: unknown) {
      const errorMessage = (error as string).toString() // Convert the error from object to string for proper error handling
      return errorMessage
    }
  }
}

export default fetchEmployees
