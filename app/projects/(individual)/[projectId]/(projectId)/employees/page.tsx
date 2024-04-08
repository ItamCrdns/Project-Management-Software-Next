'use client'
import EmployeesRender from './EmployeesRender'
import { usePathname } from 'next/navigation'
import { type SearchParams } from '@/interfaces/searchParams'
import { useGetEmployees } from '@/api-calls/getEmployees'

interface EmployeeProps {
  params: { projectId: string }
  searchParams: SearchParams
}

const EmployeesList: React.FunctionComponent<EmployeeProps> = ({
  params,
  searchParams
}) => {
  if (searchParams.page === undefined || searchParams.page === null) {
    searchParams.page = '1'
  }

  const employeesProps = {
    endpoint:
      searchParams.searchValue === undefined
        ? `${process.env.NEXT_PUBLIC_API_URL}Project/${params.projectId}/employees?page=${searchParams.page}&pageSize=5`
        : `${process.env.NEXT_PUBLIC_API_URL}Project/${params.projectId}/employees/search/${searchParams.searchValue}?page=${searchParams.page}&pageSize=5`
  }

  const pathname = usePathname()

  const { employees, isLoading } = useGetEmployees(employeesProps.endpoint) // Passing the props to the hook

  return (
    <EmployeesRender
      employeeList={employees?.data ?? []}
      totalPages={employees?.pages ?? 0}
      searchParams={searchParams}
      pathname={pathname}
      closeButtonHref={`/projects/${params.projectId}`}
      paginationUrl={`/projects/${params.projectId}/employees`}
      headerText='All employees'
      isLoading={isLoading}
    />
  )
}

export default EmployeesList
