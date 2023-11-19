// import getProjectEmployees from '@/api-calls/getEmployees'
import useEmployeesGetter from '@/api-calls/getEmployees'
// import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
// import { type Employee } from '@/interfaces/employee'

interface EmployeeFetcherProps {
  projectId: string
  searchValue?: string
  page: string
}

const fetchEmployees = async (props: EmployeeFetcherProps): Promise<any> => {
  if (props.searchValue != null) {
    const searchEndpoint = `${process.env.NEXT_PUBLIC_API_URL}Project/${props.projectId}/employees/search/${props.searchValue}`
    const { employees, isLoading, isError } = useEmployeesGetter(searchEndpoint)
    return { employees, isLoading, isError }
    // try {
    //   const response = await getProjectEmployees(
    //     `Project/${projectId}/employees/search/${searchValue}`,
    //     page,
    //     '5'
    //   )
    //   return response.data ?? 'Something went wrong'
    // } catch (error) {
    //   const errorMessage = (error as string).toString() // Convert the error from object to string for proper error handling
    //   return errorMessage
    // }
  } else {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}Project/${props.projectId}/employees`
    const { employees, isLoading, isError } = useEmployeesGetter(endpoint)
    return { employees, isLoading, isError }
    // try {
    //   const response = await getProjectEmployees(
    //     `Project/${projectId}/employees`,
    //     page,
    //     '5'
    //   )
    //   return response.data ?? 'Something went wrong'
    // } catch (error: unknown) {
    //   const errorMessage = (error as string).toString() // Convert the error from object to string for proper error handling
    //   return errorMessage
    // }
  }
}

export default fetchEmployees
