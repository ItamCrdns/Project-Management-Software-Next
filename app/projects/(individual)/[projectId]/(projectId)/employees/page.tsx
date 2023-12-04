'use client'
import EmployeesRender from './EmployeesRender'
import { usePathname } from 'next/navigation'
import { type SearchParams } from '@/interfaces/searchParams'
import useGetEmployees from '@/utility/employees/useGetEmployees'

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
      searchParams.search === undefined
        ? `${process.env.NEXT_PUBLIC_API_URL}Project/${params.projectId}/employees?page=${searchParams.page}&pageSize=5`
        : `${process.env.NEXT_PUBLIC_API_URL}Project/${params.projectId}/employees/search/${searchParams.search}?page=${searchParams.page}&pageSize=5`
  }

  const pathname = usePathname()

  const { employeeList, totalPages, message } = useGetEmployees(employeesProps.endpoint) // Passing the props to the hook

  return (
    <EmployeesRender
      employeeList={employeeList}
      message={message}
      totalPages={totalPages}
      searchParams={searchParams}
      pathname={pathname}
      closeButtonHref={`/projects/${params.projectId}`}
      paginationUrl={`/projects/${params.projectId}/employees`}
      headerText='All employees'
    />
  )
}

export default EmployeesList
