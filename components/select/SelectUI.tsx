import styles from './select.module.css'
import {
  type CustomSelectProps,
  type Option
} from '@/interfaces/props/CustomSelectProps'
import ResetUI from './ResetUI'
import OptionsListUI from './OptionsListUI'
import OptionsInitialUI from './OptionsUI'

export interface SelectUIProps extends Partial<CustomSelectProps> {
  selectedOption: Option | null
  selectedOptions: Option[] // * Pretty much as above. But will be for multiple options selection
  text: string
  toggle: boolean
  disabled: boolean
  handleToggleDropdown: (toggleValue: boolean) => void
  handleOptionClick: (option: Option) => void
  handleMultipleOptionClick: (option: Option) => void // ? This is for multiple options selection
  resetSelectedOption: () => void
  showCloseButton?: boolean
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
          showPictures={props.showPictures}
          multiple={props.multiple}
        />
        <OptionsListUI
          toggle={props.toggle}
          options={props.options}
          handleToggleDropdown={props.handleToggleDropdown}
          handleOptionClick={props.handleOptionClick}
          handleMultipleOptionClick={props.handleMultipleOptionClick}
          pageSize={props.pageSize}
          onPageChange={props.onPageChange}
          isPaginated={props.isPaginated}
          showPictures={props.showPictures}
          // * This is to have a visual representation of whats selected
          selectedOptions={props.selectedOptions} // TODO: Add single selectedOption too.
          multiple={props.multiple}
          showCloseButton={true} // ! Change this
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