'use client'
import { useEffect, useState } from 'react'
import {
  type Option,
  type CustomSelectProps
} from '@/interfaces/props/CustomSelectProps'
import SelectUI from './SelectUI'

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false)

  const disabled = props.disabled === true

  useEffect(() => {
    setToggle(false)
  }, [disabled])

  const handleToggleDropdown = (toggleValue: boolean): void => {
    if (props.disabled !== null && props.disabled === true) return
    setToggle(toggleValue)
  }

  const selectedOptionInitialState = (): Option | null => {
    if (
      props.defaultEntities !== undefined &&
      !Array.isArray(props.defaultEntities)
    ) {
      return props.defaultEntities
    } else {
      return null
    }
  }
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    selectedOptionInitialState
  )

  const handleOptionClick = (option: Option, event: React.MouseEvent): void => {
    if (disabled) {
      props.closeDropdown?.()
      return
    }

    event.nativeEvent.stopImmediatePropagation() // * Avoids closing Filters when clicking on the dropdown
    setSelectedOption(option)
    setToggle(false)
    props.onSelect(option)
    props.closeDropdown?.()
  }

  const resetSelectedOption = (): void => {
    setSelectedOption(null)
    setSelectedOptions([])
    props.onSelect(null)
    props.clearOptions?.()
  }

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [initialRender, setInitialRender] = useState<boolean>(true)

  const handleOptionClickMultiple = (option: Option): void => {
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
    <SelectUI
      defaultValue={props.defaultValue}
      defaultEntities={props.defaultEntities}
      options={props.options}
      isPaginated={props.isPaginated}
      pageSize={props.pageSize}
      showReset={props.showReset}
      onPageChange={props.onPageChange}
      handleToggleDropdown={handleToggleDropdown}
      handleOptionClick={handleOptionClick}
      handleMultipleOptionClick={handleOptionClickMultiple}
      resetSelectedOption={resetSelectedOption}
      disabled={disabled}
      selectedOption={selectedOption}
      toggle={toggle}
      multiple={props.multiple}
      showCloseButton={props.showCloseButton}
      shouldShowDropdown={props.shouldShowDropdown}
      onShowDropdown={props.onShowDropdown}
      closeDropdown={props.closeDropdown}
      showPictures={props.showPictures}
    />
  )
}

export default CustomSelect
