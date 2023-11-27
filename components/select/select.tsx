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

  // * Single option selection and resetting
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const handleOptionClick = (option: Option): void => {
    setSelectedOption(option)
    props.onSelect(option)
    setToggle(false)
  }

  // ? Reset from the child component
  const resetSelectedOption = (): void => {
    setSelectedOption(null)
    if (props.clearSelectedOption !== undefined) {
      props.clearSelectedOption() // ? Pass the callback function that will clear the selected option in the parent component
    }
  }

  // ? Reset from a parent component
  useEffect(() => {
    if (props.clearSelectedOptionBoolean === true) {
      setSelectedOption(null)
    }
  }, [props.clearSelectedOptionBoolean])

  // * End of single option selection and resetting

  // * Multiple options selection and resetting
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
    if (props.clearSelectedOptions === true) {
      setSelectedOptions([])
    }
  }, [props.clearSelectedOptions])

  // * End of multiple options selection and resetting

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
      selectedOptions={props.defaultSelectedOptions}
      toggle={toggle}
      showPictures={props.showPictures}
      multiple={props.multiple}
      optionsWidth={props.optionsWidth}
      showCloseButton={props.showCloseButton}
    />
  )
}

export default CustomSelect
