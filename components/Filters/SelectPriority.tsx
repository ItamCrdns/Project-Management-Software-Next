import CustomSelect from '../select/select'
import { priorityOptions } from '@/app/projects/(list)/new/priorityOptions'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import setEntityPriority from '../Generic Entity Renderer/EntityPriority'
import { type ISharedProps } from './SelectAuthorInterfaces'

interface ISelectPriorityProps extends ISharedProps {
  getPriorityValue: (priority: number) => void
}

const SelectPriority: React.FC<ISelectPriorityProps> = (props) => {
  const handlePrioritySelect = (selectedValue: Option | Option[]): void => {
    if (!Array.isArray(selectedValue)) {
      props.getPriorityValue(selectedValue.value)
    }
  }

  const priority = setEntityPriority(parseInt(props.defaultSectedValues ?? '0'))

  return (
    <CustomSelect
      options={priorityOptions}
      text="Priority"
      onSelect={handlePrioritySelect}
      defaultValue={priority.priorityText}
      defaultSelectedOptions="" // TODO: Migh make it null
      optionsWidth="400px"
      showCloseButton={false}
      clearSelectedOptionBoolean={props.clearValues}
      shouldShowDropdown={props.shouldShowDropdown}
      onShowDropdown={props.onShowDropdown}
    />
  )
}

export default SelectPriority
