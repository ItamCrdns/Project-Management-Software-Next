import CustomSelect from '@/components/select/select'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import options from './sortByOptions'

const SortBy: React.FC = () => {
  const handleSortBySelect = (selectedValue: Option): void => {}

  return (
    <>
      <p>Order by</p>
      <CustomSelect
        text="option"
        options={options ?? []}
        defaultValue=""
        onSelect={handleSortBySelect}
      />
    </>
  )
}

export default SortBy
