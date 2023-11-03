'use client'
import { useEffect, useState } from 'react'
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
  disabled?: boolean // ? Will use it to disable the custom select based on a condition
  clearSelectedOption?: () => void // ? Optional callback function that will clear the selected option in the parent component
}

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
    <div className={styles.customselectwrapper}>
      <div
        className={styles.customselect}
        style={{ width: props.width ?? '190px' }}
      >
        <div onClick={handleToggleDropdown} className={styles.optionselected}>
          <p style={{ color: disabled ? 'gray' : 'var(--text-color)' }}>
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
      {selectedOption !== null && (
        <span className={styles.reset} onClick={resetSelectedOption}>
          Reset
        </span>
      )}
    </div>
  )
}

export default CustomSelect
