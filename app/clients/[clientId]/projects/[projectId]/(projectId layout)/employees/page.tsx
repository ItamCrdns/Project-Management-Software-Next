'use client'
import { type SearchParams } from '@/interfaces/searchParams'
import { useGetEmployees } from '@/api-calls/getEmployees'
import EmployeesRender from '@/components/UI/Employees render/EmployeesRender'

interface EmployeeProps {
  params: { clientId: string; projectId: string }
  searchParams: SearchParams
}

const EmployeesListPage: React.FC<EmployeeProps> = ({
  params,
  searchParams
}) => {
  if (searchParams.page === undefined || searchParams.page === null) {
    searchParams.page = '1'
  }

  const employeesProps = {
    endpoint:
      searchParams.searchValue === undefined
        ? `${process.env.NEXT_PUBLIC_API_URL}Project/${params.projectId}/employees?page=${searchParams.page}&pageSize=1`
        : `${process.env.NEXT_PUBLIC_API_URL}Project/${params.projectId}/employees/search/${searchParams.searchValue}?page=${searchParams.page}&pageSize=1`
  }

  const { employees, totalPages, isLoading } = useGetEmployees(
    employeesProps.endpoint
  )

  return (
    <EmployeesRender
      employeeList={employees}
      totalPages={totalPages}
      searchParams={searchParams}
      closeButtonHref={`/clients/${params.clientId}/projects/${params.projectId}`}
      headerText='All employees'
      isLoading={isLoading}
    />
  )
}

export default EmployeesListPage
