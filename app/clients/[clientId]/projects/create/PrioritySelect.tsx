import CustomSelect from '@/components/select/select'
import { useState } from 'react'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { ClearSelect } from '@/components/select/Clear'
import { optionInitialState } from '@/interfaces/props/CustomSelectProps'
import { priorityOptions } from './priorityOptions'

const PrioritySelect: React.FC<{
  priority: string | null
  error?: boolean
  errorMessage?: string
}> = (props) => {
  const { priority } = props
  const { setPriority } = useNewProjectActions()

  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <div className='flex items-center gap-4'>
      <div className='w-full'>
        <CustomSelect
          defaultValue={priority === '' ? 'Pick a priority...' : priority ?? ''}
          options={priorityOptions}
          sendStateToParent={(priority) => {
            setPriority(priority)
          }}
          shouldShowDropdown={toggle}
          onShowDropdown={() => {
            setToggle(!toggle)
          }}
          closeDropdown={() => {
            setToggle(false)
          }}
          error={props.error}
          errorMessage={props.errorMessage}
        />
      </div>
      {priority !== '' && priority !== null && (
        <ClearSelect
          callback={() => {
            setPriority(optionInitialState)
          }}
        />
      )}
    </div>
  )
}

export { PrioritySelect }
