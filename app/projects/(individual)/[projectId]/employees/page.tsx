'use client'
import EmployeesRender from './EmployeesRender'
import useGetEmployees, {
  type UseGetEmployeesProps
} from '@/utility/employees/useGetEmployees'
import { usePathname } from 'next/navigation'
import { type SearchParams } from '@/interfaces/searchParams'

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

  const employeesProps: UseGetEmployeesProps = {
    endpoint:
      searchParams.search === undefined
        ? `Project/${params.projectId}/employees`
        : `Project/${params.projectId}/employees/search/${searchParams.search}`,
    page: searchParams.page,
    searchValue: searchParams.search
  }

  const pathname = usePathname()

  const { employeeList, totalPages, message } = useGetEmployees(employeesProps) // Passing the props to the hook

  return (
    <EmployeesRender
      employeeList={employeeList}
      message={message}
      totalPages={totalPages}
      searchParams={searchParams}
      pathname={pathname}
      closeButtonHref={`/projects/${params.projectId}`}
      paginationUrl={`/projects/${params.projectId}/employees`}
      headerText="All employees"
    />
  )
}

export default EmployeesList
