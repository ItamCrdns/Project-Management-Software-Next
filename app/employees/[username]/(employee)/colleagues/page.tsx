'use client'
import EmployeesRender from '@/app/projects/(individual)/[projectId]/(projectId)/employees/EmployeesRender'
import { usePathname } from 'next/navigation'
import { type EmployeeColleaguesProps } from '@/interfaces/props/EmployeeColleaguesProps'
import { useGetEmployees } from '@/api-calls/getEmployees'

const Colleagues: React.FC<EmployeeColleaguesProps> = (
  props
) => {
  const { params, searchParams } = props
  const { username } = params
  if (searchParams.page === undefined || searchParams.page === null) {
    searchParams.page = '1'
  }

  const pathname = usePathname()

  const employeesProps = {
    endpoint:
      searchParams.searchValue === undefined
        ? `${process.env.NEXT_PUBLIC_API_URL}Employee/${params.username}/colleagues?page=${searchParams.page}&pageSize=5`
        : `${process.env.NEXT_PUBLIC_API_URL}Employee/${params.username}/colleagues/search/${searchParams.searchValue}?page=${searchParams.page}&pageSize=5`
  }

  const { employees, isLoading } = useGetEmployees(employeesProps.endpoint) // Passing the props to the hook

  return (
    <EmployeesRender
      employeeList={employees?.data ?? []}
      totalPages={employees?.pages ?? 0}
      searchParams={searchParams}
      pathname={pathname}
      closeButtonHref={`/employees/${username}`}
      paginationUrl={`/employees/${username}/colleagues`}
      headerText='Colleagues'
      isLoading={isLoading}
    />
  )
}

export default Colleagues
