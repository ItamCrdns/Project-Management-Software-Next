import getEmployeesThatHaveCreatedProjects from '@/api-calls/getEmployeesThatHaveCreatedProjects'
import {
  useParams,
  usePathname,
  useSearchParams,
  useRouter
} from 'next/navigation'
import CustomSelect from '../select/select'
import { employeesAsOptions } from './employeesAsOptions'
import { useState } from 'react'
import { type ISharedProps, type IParams } from './SelectAuthorInterfaces'
import { type Option } from '@/interfaces/props/CustomSelectProps'

const SelectAuthor: React.FC<ISharedProps> = (props) => {
  const params: IParams = useParams()
  if (params.client === undefined) return null // ? Should never return null, but just in case

  const [currentPage, setCurrentPage] = useState<number>(1)
  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
  }

  const { employees } = getEmployeesThatHaveCreatedProjects(
    Number(params.client[0]),
    true,
    { page: currentPage.toString(), pageSize: '5' }
  )

  const pathname = usePathname()
  const router = useRouter()
  const nextJsParams = useSearchParams()
  const searchParams = new URLSearchParams(Array.from(nextJsParams.entries()))

  const handleEmployeeSelect = (
    selectedEmployees: Option | Option[] | null
  ): void => {
    if (Array.isArray(selectedEmployees)) {
      const ids = selectedEmployees.map((e) => e.value)
      if (ids.length > 0) {
        searchParams.set('author', ids.join('-'))
      } else if (ids.length === 0) {
        searchParams.delete('author')
      }

      searchParams.set('pagesize', '10')
      router.replace(`${pathname}?${searchParams.toString()}`)
    }
  }

  const employeesFromIds = employees?.data.filter((x) =>
    searchParams.get('author')?.split('-').includes(x.employeeId.toString())
  )

  const pictures = employeesFromIds?.map((e) => e.profilePicture) ?? []

  const { shouldShowDropdown, onShowDropdown, closeDropdown } = props

  const selectProps = {
    options: employeesAsOptions(employees?.data),
    onSelect: handleEmployeeSelect,
    clearOptions: props.clearFilters,
    isPaginated: true,
    pageSize: employees?.pages,
    onPageChange: handlePageChange,
    defaultValue:
      pictures !== undefined && pictures.length > 0
        ? pictures
        : 'Select author',
    defaultEntities: employeesAsOptions(employeesFromIds),
    multiple: true,
    showCloseButton: true,
    shouldShowDropdown,
    onShowDropdown,
    closeDropdown,
    showReset: false,
    showPictures: true
  }

  return <CustomSelect {...selectProps} />
}

export { SelectAuthor }
