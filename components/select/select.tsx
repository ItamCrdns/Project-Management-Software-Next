'use client'
import {
  type Option,
  type CustomSelectProps
} from '@/interfaces/props/CustomSelectProps'
import { CurrentOption } from './CurrentOption'
import { OptionsList } from './OptionsList'

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const disabled = props.disabled === true

  const handleOptionClick = (option: Option, event: React.MouseEvent): void => {
    if (disabled) {
      props.closeDropdown?.()
      return
    }

    event.nativeEvent.stopImmediatePropagation() // * Avoids closing Filters when clicking on the dropdown
    props.sendStateToParent(option)
    props.closeDropdown?.()
  }

  const handleMultipleOptionClick = (option: Option): void => {
    props.sendStateToParent(option)
  }

  return (
    <div className='flex items-center justify-center min-w-64'>
      <div className='relative flex flex-col items-end justify-self-center w-full justify-center rounded-md min-h-10 m-0 py-0 px-6 bg-theming-white200 dark:bg-theming-dark200'>
        <CurrentOption
          disabled={disabled}
          selectedOption={props.selectedOption}
          defaultValue={props.defaultValue}
          defaultEntities={props.defaultEntities}
          onShowDropdown={props.onShowDropdown}
        />
        {props.shouldShowDropdown === true && (
          <OptionsList
            closeDropdown={props.closeDropdown}
            options={props.options}
            handleOptionClick={handleOptionClick}
            handleMultipleOptionClick={handleMultipleOptionClick}
            pageSize={props.pageSize}
            onPageChange={props.onPageChange}
            isPaginated={props.isPaginated}
            multiple={props.multiple}
            showCloseButton={props.showCloseButton}
            defaultEntities={props.defaultEntities}
            showPictures={props.showPictures}
          />
        )}
      </div>
    </div>
  )
}

export default CustomSelect
