import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import CustomSelect from '../select/select'
import { employeesAsOptions } from './employeesAsOptions'
import { useEffect } from 'react'
import { type ISharedProps } from './SelectAuthorInterfaces'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import { type DataCountPages } from '@/interfaces/DataCountPages.interface'
import { type Employee } from '@/interfaces/employee'

// TODO: CLICKING EMPLOYEES TRIGGERS RERENDER AND REFETCH

interface SelectAuthorProps {
  selectedAuthors: Option[] | null
  onEmployeeSelect: (author: Option | Option[] | null) => void
  allEmployees: DataCountPages<Employee>
  selectedEmployees: Employee[]
  handlePageChange: (page: number) => void
}

const SelectAuthor: React.FC<SelectAuthorProps & ISharedProps> = (props) => {
  const pathname = usePathname()
  const router = useRouter()
  const nextJsParams = useSearchParams()
  const searchParams = new URLSearchParams(Array.from(nextJsParams.entries()))

  const { shouldShowDropdown, onShowDropdown, closeDropdown } = props

  const receiveEmployeeFromChild = (
    employee: Option | Option[] | null
  ): void => {
    if (!Array.isArray(employee) && employee !== null) {
      props.onEmployeeSelect(employee)
    }
  }

  useEffect(() => {
    if (
      Array.isArray(props.selectedAuthors) &&
      props.selectedAuthors.length > 0
    ) {
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
    options: employeesAsOptions(props.allEmployees.data),
    sendStateToParent: receiveEmployeeFromChild,
    isPaginated: true,
    pageSize: props.allEmployees?.pages,
    onPageChange: props.handlePageChange,
    defaultValue: 'Select an author...',
    defaultEntities: employeesAsOptions(props.selectedEmployees),
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
