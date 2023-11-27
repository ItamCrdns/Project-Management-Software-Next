import CustomSelect from '../select/select'
import { priorityOptions } from '@/app/projects/(list)/new/priorityOptions'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import setEntityPriority from '../Generic Entity Renderer/EntityPriority'

interface ISelectPriorityProps {
  getPriorityValue: (priority: number) => void
  clearPriorityValue: boolean
  defaultSelectedPriority: string
}

const SelectPriority: React.FC<ISelectPriorityProps> = (props) => {
  const handlePrioritySelect = (selectedValue: Option | Option[]): void => {
    if (!Array.isArray(selectedValue)) {
      props.getPriorityValue(selectedValue.value)
    }
  }

  const priority = setEntityPriority(parseInt(props.defaultSelectedPriority ?? '0'))

  return (
    <CustomSelect
      options={priorityOptions}
      text="Priority"
      onSelect={handlePrioritySelect}
      defaultValue={priority.priorityText}
      defaultSelectedOptions="" // TODO: Migh make it null
      optionsWidth="400px"
      showCloseButton={false}
      clearSelectedOptionBoolean={props.clearPriorityValue}
    />
  )
}

export default SelectPriority
