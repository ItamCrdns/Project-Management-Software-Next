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
import { getEmployeesByIdsArray } from '@/api-calls/getEmployeesByIdsArray'

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
    { page: currentPage, pageSize: 5 }
  )

  const pathname = usePathname()
  const router = useRouter()
  const nextJsParams = useSearchParams()
  const searchParams = new URLSearchParams(Array.from(nextJsParams.entries()))

  const handleEmployeeSelect = (selectedEmployees: Option | Option[]): void => {
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

  const handleEmployeeFilterClear = (): void => {
    searchParams.delete('author')
    searchParams.set('pagesize', '10')

    router.replace(`${pathname}?${searchParams.toString()}`)
    props.closeDropdown()
  }

  const { employeesFromIds } = getEmployeesByIdsArray(
    searchParams
      .get('author')
      ?.split('-')
      .map((i) => Number(i)) ?? [],
    searchParams.get('author') !== null
  )

  const { shouldShowDropdown, onShowDropdown, closeDropdown, clearValues } =
    props

  const selectProps = {
    options: employeesAsOptions(employees?.data),
    text: 'Author or authors',
    onSelect: handleEmployeeSelect,
    clearOptions: handleEmployeeFilterClear,
    isPaginated: true,
    pageSize: employees?.pages,
    onPageChange: handlePageChange,
    defaultValue: employeesFromIds?.map((e) => e.profilePicture) ?? [],
    defaultEntities: employeesAsOptions(employeesFromIds),
    multiple: true,
    showCloseButton: true,
    shouldShowDropdown,
    onShowDropdown,
    closeDropdown,
    showReset: true,
    clearSelectedOptions: clearValues,
    showPictures: true
  }

  return <CustomSelect {...selectProps} />
}

export default SelectAuthor
