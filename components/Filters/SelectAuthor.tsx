import { useParams, usePathname, useSearchParams, useRouter } from 'next/navigation'
import CustomSelect from '../select/select'
import { employeesAsOptions } from './employeesAsOptions'
import { useEffect, useState } from 'react'
import { type ISharedProps, type IParams } from './SelectAuthorInterfaces'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import {
  type EmployeeFetcherProps,
  getEmployeesForFilters
} from './getEmployeesForFilters'

// TODO: CLICKING EMPLOYEES TRIGGERS RERENDER AND REFETCH

interface SelectAuthorProps {
  selectedAuthors: Option[] | null
  onEmployeeSelect: (author: Option | Option[] | null) => void
  onDefaultSelectedAuthors: (authors: Option[]) => void
}

const SelectAuthor: React.FC<SelectAuthorProps & ISharedProps> = (props) => {
  const params: IParams = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const nextJsParams = useSearchParams()
  const searchParams = new URLSearchParams(Array.from(nextJsParams.entries()))

  if (params.client === undefined) return null // ? Should never return null, but just in case

  const [currentPage, setCurrentPage] = useState<number>(1)

  const employeesFromUrl = searchParams.get('author')?.split('-')

  const employeeFetcherProps: EmployeeFetcherProps = {
    ids: employeesFromUrl,
    shouldFetch: true,
    clientId: Number(params.client[0]),
    page: currentPage.toString(),
    limit: '3'
  }

  const { selectedEmployees, allEmployees } =
    getEmployeesForFilters(employeeFetcherProps)

  const { shouldShowDropdown, onShowDropdown, closeDropdown } = props

  const receiveEmployeeFromChild = (
    employee: Option | Option[] | null
  ): void => {
    if (!Array.isArray(employee) && employee !== null) {
      props.onEmployeeSelect(employee)
    }
  }

  useEffect(() => {
    if (Array.isArray(props.selectedAuthors) && props.selectedAuthors.length > 0) {
      const ids = props.selectedAuthors.map((e) => e.value)
      if (ids.length > 0) {
        searchParams.set('author', ids.join('-'))
      } else if (ids.length === 0) {
        searchParams.delete('author')
      }

      searchParams.set('pagesize', '10')

      router.replace(`${pathname}?${searchParams.toString()}`)
    }
  }, [props.selectedAuthors])

  const selectProps = {
    options: employeesAsOptions(allEmployees.data),
    sendStateToParent: receiveEmployeeFromChild,
    isPaginated: true,
    pageSize: allEmployees?.pages,
    onPageChange: (page: number): void => {
      setCurrentPage(page)
    },
    defaultValue: 'Select an author...',
    defaultEntities: employeesAsOptions(selectedEmployees),
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
