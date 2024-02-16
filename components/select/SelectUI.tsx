import styles from './select.module.css'
import {
  type CustomSelectProps,
  type Option
} from '@/interfaces/props/CustomSelectProps'
import ResetUI from './ResetUI'
import OptionsListUI from './OptionsListUI'
import OptionsInitialUI from './OptionsInitialUI'

export interface SelectUIProps extends Partial<CustomSelectProps> {
  selectedOption: Option | null
  text: string
  toggle: boolean
  disabled: boolean
  handleToggleDropdown: (toggleValue: boolean) => void
  handleOptionClick: (option: Option, event: React.MouseEvent) => void
  handleMultipleOptionClick: (option: Option) => void // ? This is for multiple options selection
  resetSelectedOption: () => void
}

const SelectUI: React.FC<SelectUIProps> = (props) => {
  return (
    <div className={styles.customselectwrapper}>
      <div className={styles.customselect}>
        <OptionsInitialUI
          handleToggleDropdown={props.handleToggleDropdown}
          disabled={props.disabled}
          selectedOption={props.selectedOption}
          defaultValue={props.defaultValue}
          text={props.text}
          multiple={props.multiple}
          onShowDropdown={props.onShowDropdown}
          closeDropdown={props.closeDropdown}
        />
        <OptionsListUI
          toggle={props.toggle}
          shouldShowDropdown={props.shouldShowDropdown}
          closeDropdown={props.closeDropdown}
          options={props.options}
          handleToggleDropdown={props.handleToggleDropdown}
          handleOptionClick={props.handleOptionClick}
          handleMultipleOptionClick={props.handleMultipleOptionClick}
          pageSize={props.pageSize}
          onPageChange={props.onPageChange}
          isPaginated={props.isPaginated}
          // * This is to have a visual representation of whats selected
          multiple={props.multiple}
          showCloseButton={props.showCloseButton} // ! Change this to actually take it from the props
          defaultEntities={props.defaultEntities}
          showPictures={props.showPictures}
        />
      </div>
      <ResetUI
        defaultValue={props.defaultValue}
        showReset={props.showReset}
        resetSelectedOption={props.resetSelectedOption}
      />
    </div>
  )
}

export default SelectUI
