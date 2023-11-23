import styles from './select.module.css'
import Pagination from '../pagination/pagination'
import {
  type CustomSelectProps,
  type Option
} from '@/interfaces/props/CustomSelectProps'

interface SelectUIProps extends Partial<CustomSelectProps> {
  selectedOption: Option | null
  text: string
  toggle: boolean
  disabled: boolean
  handleToggleDropdown: () => void
  handleOptionClick: (option: Option) => void
  resetSelectedOption: () => void
}

const SelectUI: React.FC<SelectUIProps> = (props) => {
  return (
    <div className={styles.customselectwrapper}>
      <div
        className={styles.customselect}
        style={{ width: props.width ?? '190px' }}
      >
        <div
          onClick={props.handleToggleDropdown}
          className={styles.optionselected}
        >
          <p style={{ color: props.disabled ? 'gray' : 'var(--text-color)' }}>
            {props.selectedOption !== null
              ? props.selectedOption.label
              : props.defaultValue !== ''
                ? props.defaultValue
                : `Select a ${props.text}...`}
                {/* //TODO: Make it so you can pass the whole text. Will need to adjust all the places I am using this component and probably will have to update the CSS if the text its too big. */}
          </p>
          <span className="material-symbols-outlined">expand_more</span>
        </div>
        {props.toggle && Array.isArray(props.options) && (
          <div className={styles.optionswrapper}>
            <ul>
              {props.options.map((option) => (
                <li
                  onClick={() => {
                    props.handleOptionClick(option)
                  }}
                  key={option.value}
                >
                  <h4>{option.label}</h4>
                  <p>{option.info}</p>
                </li>
              ))}
            </ul>
            {props.isPaginated !== null && props.isPaginated === true && (
              <Pagination
                totalPages={props.pageSize ?? 1}
                onPageChange={
                  props.onPageChange ??
                  (() => {}) /* ? Empty function to avoid TS error */
                }
                iconSize={props.iconSize}
              />
            )}
          </div>
        )}
      </div>
      {props.defaultValue !== '' &&
        props.showReset !== null &&
        props.showReset === true && (
          <span className={styles.reset} onClick={props.resetSelectedOption}>
            Reset
          </span>
      )}
    </div>
  )
}

export default SelectUI
