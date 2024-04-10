'use client'
import { useGetEmployees } from '@/api-calls/getEmployees'
import EmployeesRender from '@/app/projects/(individual)/[projectId]/(projectId)/employees/EmployeesRender'
import { useGetSearchParams } from '@/components/Filters/useGetSearchParams'
import { type SearchParams } from '@/interfaces/searchParams'

const Coworkers: React.FC<{
  params: { username: string }
  searchParams: SearchParams
}> = (props) => {
  const { params, searchParams } = props
  const { username } = params

  if (searchParams.page === undefined || searchParams.page === null) {
    searchParams.page = '1'
  }

  const { pathname } = useGetSearchParams()

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
      closeButtonHref={`/employee/${username}`}
      paginationUrl={`/employee/${username}/colleagues`}
      headerText='Coworkers'
      isLoading={isLoading}
    />
  )
}

export default Coworkers
