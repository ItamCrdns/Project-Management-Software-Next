'use client'
import {
  type Option,
  type CustomSelectProps
} from '@/interfaces/props/CustomSelectProps'
import { CurrentOption } from './CurrentOption'
import { OptionsList } from './OptionsList'
import { Reset } from './Reset'
import { useEffect, useState } from 'react'

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [initialRender, setInitialRender] = useState<boolean>(true)

  const disabled = props.disabled === true

  const handleOptionClick = (option: Option, event: React.MouseEvent): void => {
    if (disabled) {
      props.closeDropdown?.()
      return
    }

    event.nativeEvent.stopImmediatePropagation() // * Avoids closing Filters when clicking on the dropdown
    setSelectedOption(option)
    props.onSelect(option)
    props.closeDropdown?.()
  }

  const handleClearAll = (): void => {
    setSelectedOption(null)
    setSelectedOptions([])
    props.onSelect(null)
    props.clearOptions?.()
  }

  const handleMultipleOptionClick = (option: Option): void => {
    if (disabled) return

    if (
      Array.isArray(props.defaultEntities) &&
      props.defaultEntities.length > 0
    ) {
      setSelectedOptions(props.defaultEntities)
    }

    setSelectedOptions((prev) => {
      if (prev.some((o) => o.value === option.value)) {
        return prev.filter((o) => o.value !== option.value)
      }
      return [...prev, option]
    })
  }

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false)
      return
    }

    props.onSelect(selectedOptions)
  }, [selectedOptions])

  return (
    <div className='flex items-center justify-center min-w-64'>
      <div className='relative flex flex-col items-end justify-self-center w-full justify-center rounded-md min-h-10 m-0 py-0 px-6 bg-theming-white200 dark:bg-theming-dark200'>
        <CurrentOption
          disabled={disabled}
          selectedOption={selectedOption}
          defaultValue={props.defaultValue}
          onShowDropdown={props.onShowDropdown}
        />
        <OptionsList
          shouldShowDropdown={props.shouldShowDropdown}
          closeDropdown={props.closeDropdown}
          options={props.options}
          handleOptionClick={handleOptionClick}
          handleMultipleOptionClick={handleMultipleOptionClick}
          pageSize={props.pageSize}
          onPageChange={props.onPageChange}
          isPaginated={props.isPaginated}
          multiple={props.multiple}
          showCloseButton={props.showCloseButton}
          defaultEntities={selectedOptions}
          showPictures={props.showPictures}
        />
      </div>
      {props.showReset === true && <Reset reset={handleClearAll} />}
    </div>
  )
}

export default CustomSelect
