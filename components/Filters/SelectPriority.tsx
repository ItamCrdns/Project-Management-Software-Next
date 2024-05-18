import CustomSelect from '../select/select'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import setEntityPriority from '../Generic Entity Renderer/EntityPriority'
import { type ISharedProps } from './SelectAuthor.interface'
import { priorityOptions } from '@/app/clients/[clientId]/projects/create/priorityOptions'
import { useGetSearchParams } from './useGetSearchParams'

interface SelectPriorityProps {
  selectedPriority: Option | null
  onPrioritySelect: (priority: Option | Option[] | null) => void
}

const SelectPriority: React.FC<SelectPriorityProps & ISharedProps> = (
  props
) => {
  const { router, pathname, searchParams } = useGetSearchParams()

  const handlePrioritySelect = (priority: Option | Option[] | null): void => {
    if (!Array.isArray(priority) && priority !== null) {
      if (priority.value === 0) {
        return
      }

      props.onPrioritySelect(priority)
      searchParams.set('priority', priority.value.toString())

      router.replace(`${pathname}?${searchParams.toString()}`)
    }
  }

  const receivePriorityFromChild = (
    priority: Option | Option[] | null
  ): void => {
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
