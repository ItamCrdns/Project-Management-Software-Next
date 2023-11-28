'use client'
import { useEffect, useState } from 'react'
import {
  type Option,
  type CustomSelectProps
} from '@/interfaces/props/CustomSelectProps'
import SelectUI from './SelectUI'

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false)

  const disabled = props.disabled !== null && props.disabled === true

  useEffect(() => {
    setToggle(false)
  }, [disabled])

  const handleToggleDropdown = (toggleValue: boolean): void => {
    if (props.disabled !== null && props.disabled === true) return
    setToggle(toggleValue)
  }

  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const handleOptionClick = (option: Option): void => {
    setSelectedOption(option)
    setToggle(false)
    props.onSelect(option)
    props.resetActiveDropdown?.()
  }

  const resetSelectedOption = (): void => {
    props.clearSelectedOptionsFunction?.() // ? Pass the callback function that will clear the selected options in the parent component
    setSelectedOption(null)
    setSelectedOptions([])
  }

  useEffect(() => {
    if (props.clearSelectedOptionBoolean === true) {
      setSelectedOption(null)
    }

    if (props.clearSelectedOptions === true) {
      setSelectedOptions([])
    }
  }, [props.clearSelectedOptionBoolean, props.clearSelectedOptions])

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

  const handleOptionClickMultiple = (option: Option): void => {
    // * Same as handleEmployeeClick in AddEmployeesToProject
    setSelectedOptions((prevState) => {
      if (prevState?.some((opt) => opt.value === option.value)) {
        // ? If already selected, remove it from the array
        return prevState.filter((opt) => opt.value !== option.value)
      } else {
        // ? If not selected, add it to the array
        return [...prevState, option]
      }
    })
  }

  useEffect(() => {
    // * Fix state not ready when calling onSelect inside handleOptionClickMultiple
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
      text={props.text}
      onPageChange={props.onPageChange}
      handleToggleDropdown={handleToggleDropdown}
      handleOptionClick={handleOptionClick}
      handleMultipleOptionClick={handleOptionClickMultiple}
      resetSelectedOption={resetSelectedOption}
      disabled={disabled}
      selectedOption={selectedOption}
      defaultSelectedOptions={props.defaultSelectedOptions as number}
      toggle={toggle}
      showPictures={props.showPictures}
      multiple={props.multiple}
      optionsWidth={props.optionsWidth}
      showCloseButton={props.showCloseButton}
      shouldShowDropdown={props.shouldShowDropdown}
      onShowDropdown={props.onShowDropdown}
      resetActiveDropdown={props.resetActiveDropdown}
    />
  )
}

export default CustomSelect
