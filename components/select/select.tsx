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

  const handleOptionClick = (option: Option): void => {
    setSelectedOption(option)
    props.onSelect(option)
    setToggle(false)
  }

  const resetSelectedOption = (): void => {
    setSelectedOption(null)
    if (props.clearSelectedOption !== undefined) {
      props.clearSelectedOption() // ? Pass the callback function that will clear the selected option in the parent component
    }
  }

  return (
    <SelectUI
      width={props.width}
      defaultValue={props.defaultValue}
      options={props.options}
      isPaginated={props.isPaginated}
      pageSize={props.pageSize}
      showReset={props.showReset}
      text={props.text}
      onPageChange={props.onPageChange}
      handleToggleDropdown={handleToggleDropdown}
      handleOptionClick={handleOptionClick}
      resetSelectedOption={resetSelectedOption}
      disabled={disabled}
      selectedOption={selectedOption}
      toggle={toggle}
      showPictures={props.showPictures}
    />
  )
}

export default CustomSelect
