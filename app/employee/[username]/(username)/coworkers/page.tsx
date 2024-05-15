'use client'
import { useGetEmployees } from '@/api-calls/getEmployees'
import EmployeesRender from '@/components/UI/Employees render/EmployeesRender'
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

  const employeesProps = {
    endpoint:
      searchParams.searchValue === undefined
        ? `${process.env.NEXT_PUBLIC_API_URL}Employee/${params.username}/colleagues?page=${searchParams.page}&pageSize=5`
        : `${process.env.NEXT_PUBLIC_API_URL}Employee/${params.username}/colleagues/search/${searchParams.searchValue}?page=${searchParams.page}&pageSize=5`
  }

  const { employees, totalPages, isLoading } = useGetEmployees(
    employeesProps.endpoint
  )

  return (
    <EmployeesRender
      employeeList={employees}
      totalPages={totalPages}
      searchParams={searchParams}
      closeButtonHref={`/employee/${username}`}
      headerText='Coworkers'
      isLoading={isLoading}
    />
  )
}

export default Coworkers
