'use client'
import { useEffect, useState } from 'react'
import {
  type Option,
  type CustomSelectProps
} from '@/interfaces/props/CustomSelectProps'
import SelectUI from './SelectUI'

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const disabled = props.disabled !== null && props.disabled === true

  useEffect(() => {
    setToggle(false)
  }, [disabled])

  const handleToggleDropdown = (): void => {
    if (props.disabled !== null && props.disabled === true) return
    setToggle(!toggle)
  }

  // ? Single option selection
  const handleOptionClick = (option: Option): void => {
    setSelectedOption(option)
    props.onSelect(option)
    setToggle(false)
  }

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

  // ? Multiple options selection
  const handleOptionClickMultiple = (option: Option): void => {
    // * Same as handleEmployeeClick in AddEmployeesToProject
    setSelectedOptions((prevState) => {
      if (
        prevState !== null &&
        prevState.some((opt) => opt.value === option.value)
      ) {
        // ? If already selected, remove it from the array
        return prevState.filter((opt) => opt.value !== option.value)
      } else {
        // ? If not selected, add it to the array
        props.onSelect(option) // * Send it one by one
        return [...prevState, option]
      }
    })

    // TODO: We wont use setToggle(false) here because we want to keep the dropdown open when selecting multiple options
    // TODO: Add a button to close the dropdown (or click outside the dropdown) when done selecting options

    // ? Pretty much takes the option value and passes it to the parent component
    // props.onSelect(selectedOptions) // This is what happens at the high level component when an option is selected
  }

  const resetSelectedOption = (): void => {
    setSelectedOption(null)
    if (props.clearSelectedOption !== undefined) {
      props.clearSelectedOption() // ? Pass the callback function that will clear the selected option in the parent component
    }
  }

  return (
    <SelectUI
      defaultValue={props.defaultValue}
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
      selectedOptions={selectedOptions}
      toggle={toggle}
      showPictures={props.showPictures}
      multiple={props.multiple}
    />
  )
}

export default CustomSelect
