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
    <>
      <div className='flex items-center justify-center min-w-64 relative'>
        <div
          className={`flex flex-col items-end justify-self-center w-full box-border resize-none text-lg overflow-hidden min-w-full p-2 outline-none rounded-tremor-default transition duration-100 border shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis ${
            props.error === true ? 'border-red-500' : 'border-tremor-border'
          } ${
            props.error === true
              ? 'border-red-500'
              : 'dark:border-dark-tremor-border'
          }`}
        >
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
      {props.error === true && (
        <p className='mt-2 text-sm text-red-500'>{props.errorMessage}</p>
      )}
    </>
  )
}

export default CustomSelect
