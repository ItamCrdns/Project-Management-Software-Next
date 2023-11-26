// import { useParams } from 'next/navigation'
// import { type IParams } from './SelectAuthorInterfaces'
import CustomSelect from '../select/select'
import { priorityOptions } from '@/app/projects/(list)/new/priorityOptions'
import { type Option } from '@/interfaces/props/CustomSelectProps'

interface ISelectPriorityProps {
  getPriorityValue: (priority: number) => void
  clearPriorityValue: boolean
}

const SelectPriority: React.FC<ISelectPriorityProps> = (props) => {
//   const params: IParams = useParams()

  const handlePrioritySelect = (selectedValue: Option | Option[]): void => {
    // ? This wont be an array. Handle it properly
    if (!Array.isArray(selectedValue)) {
      props.getPriorityValue(selectedValue.value)
    }
  }

  return (
    <CustomSelect
      options={priorityOptions}
      text="Priority"
      onSelect={handlePrioritySelect}
      defaultValue=''
      defaultSelectedOptions='' // TODO: Migh make it null
      optionsWidth='400px'
      showCloseButton={false}
      clearSelectedOptionBoolean={props.clearPriorityValue}
    />
  )
}

export default SelectPriority
