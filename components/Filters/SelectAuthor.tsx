import CustomSelect from '../select/select'
import { employeesAsOptions, optionAsEmployee } from './employeesAsOptions'
import { type ISharedProps } from './SelectAuthorInterfaces'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import { type DataCountPages } from '@/interfaces/DataCountPages.interface'
import { type Employee } from '@/interfaces/employee'
interface SelectAuthorProps {
  selectedAuthors: Option[] | null
  onEmployeeSelect: (author: Employee) => void
  allEmployees: DataCountPages<Employee>
  selectedEmployees: Employee[]
  handlePageChange: (page: number) => void
}

const SelectAuthor: React.FC<SelectAuthorProps & ISharedProps> = (props) => {
  const { shouldShowDropdown, onShowDropdown, closeDropdown } = props

  const receiveEmployeeFromChild = (
    employee: Option | Option[] | null
  ): void => {
    if (!Array.isArray(employee) && employee !== null) {
      props.onEmployeeSelect(optionAsEmployee(employee))
    }
  }

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
