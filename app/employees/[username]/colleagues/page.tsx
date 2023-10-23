'use client'
import EmployeesRender from '@/app/projects/(individual)/[projectId]/employees/EmployeesRender'
import { type SearchParams } from '@/interfaces/searchParams'
import useGetEmployees, {
  type UseGetEmployeesProps
} from '@/utility/employees/useGetEmployees'
import { usePathname } from 'next/navigation'

interface Props {
  params: { username: string }
  searchParams: SearchParams
}

const Colleagues: React.FunctionComponent<Props> = ({
  params,
  searchParams
}) => {
  const { username } = params
  if (searchParams.page === undefined || searchParams.page === null) {
    searchParams.page = '1'
  }

  const pathname = usePathname()

  const employeesProps: UseGetEmployeesProps = {
    endpoint:
      searchParams.search === undefined
        ? `Employee/${params.username}/colleagues`
        : `Employee/${params.username}/colleagues/search/${searchParams.search}`,
    page: searchParams.page,
    searchValue: searchParams.search
  }

  const { employeeList, totalPages, message } = useGetEmployees(employeesProps) // Passing the props to the hook
  return (
    <EmployeesRender
      employeeList={employeeList}
      message={message}
      totalPages={totalPages}
      searchParams={searchParams}
      pathname={pathname}
      closeButtonHref={`/employees/${username}`}
      paginationUrl={`/employees/${username}/colleagues`}
      headerText='Colleagues'
    />
  )
}

export default Colleagues
