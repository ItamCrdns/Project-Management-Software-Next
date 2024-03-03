import CustomSelect from '../select/select'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import setEntityPriority from '../Generic Entity Renderer/EntityPriority'
import { type ISharedProps } from './SelectAuthorInterfaces'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { priorityOptions } from '@/app/projects/(list)/create/priorityOptions'

interface SelectPriorityProps {
  selectedPriority: Option | null
  onPrioritySelect: (priority: Option | Option[] | null) => void
}

const SelectPriority: React.FC<SelectPriorityProps & ISharedProps> = (props) => {
  const pathname = usePathname()
  const router = useRouter()
  const nextJsParams = useSearchParams()
  const searchParams = new URLSearchParams(Array.from(nextJsParams.entries()))

  const handlePrioritySelect = (priority: Option | Option[] | null): void => {
    if (!Array.isArray(priority) && priority !== null) {
      if (priority.value === 0) return
      searchParams.set('priority', priority.value.toString())
      searchParams.set('pagesize', '10')

      props.onPrioritySelect(priority)

      router.replace(`${pathname}?${searchParams.toString()}`)
    }
  }

  const receivePriorityFromChild = (priority: Option | Option[] | null): void => {
    if (!Array.isArray(priority) && priority !== null) {
      handlePrioritySelect(priority)
    }
  }

  const { onShowDropdown, closeDropdown, shouldShowDropdown } = props

  const priority = setEntityPriority(Number(props.defaultValue))

  const priorityProps = {
    options: priorityOptions,
    sendStateToParent: receivePriorityFromChild,
    defaultValue: priority.priorityText,
    showCloseButton: true,
    shouldShowDropdown,
    showReset: false,
    closeDropdown,
    onShowDropdown,
    selectedOption: props.selectedPriority
  }

  return <CustomSelect {...priorityProps} />
}

export { SelectPriority }
