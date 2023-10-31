'use client'
import { useState } from 'react'
import styles from './select.module.css'

export interface Option {
  value: number
  label: string
  info: string
}

interface CustomSelectProps {
  options: Option[]
  text: string
  onSelect: (value: Option) => void
  defaultValue: string
  width?: string
}

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const handleToggleDropdown = (): void => {
    setToggle(!toggle)
  }

  const handleOptionClick = (option: Option): void => {
    setSelectedOption(option)
    props.onSelect(option)
    setToggle(false)
  }

  return (
    <div className={styles.customselect} style={{ width: props.width ?? '190px' }}>
      <div onClick={handleToggleDropdown} className={styles.optionselected}>
        <p>
          {selectedOption !== null
            ? selectedOption.label
            : props.defaultValue !== ''
              ? props.defaultValue
              : `Select a ${props.text}...`}
        </p>
        <span className="material-symbols-outlined">expand_more</span>
      </div>
      {toggle && Array.isArray(props.options) && (
        <ul>
          {props.options.map((option) => (
            <li
              onClick={() => {
                handleOptionClick(option)
              }}
              key={option.value}
            >
              <h4>{option.label}</h4>
              <p>{option.info}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomSelect
