import {
  type CustomSelectProps,
  type Option
} from '@/interfaces/props/CustomSelectProps'
import ResetUI from './ResetUI'
import OptionsInitialUI from './OptionsInitialUI'
import OptionsListUI from './OptionsListUI'

export interface SelectUIProps extends Partial<CustomSelectProps> {
  selectedOption: Option | null
  toggle: boolean
  disabled: boolean
  handleToggleDropdown: (toggleValue: boolean) => void
  handleOptionClick: (option: Option, event: React.MouseEvent) => void
  handleMultipleOptionClick: (option: Option) => void // ? This is for multiple options selection
  resetSelectedOption: () => void
}

const SelectUI: React.FC<SelectUIProps> = (props) => {
  return (
    <div className='flex items-center'>
      <div className='relative flex flex-col items-end justify-self-center justify-center rounded-md w-full min-h-10 m-0 py-0 px-6 bg-theming-white200 dark:bg-theming-dark300'>
        <OptionsInitialUI
          handleToggleDropdown={props.handleToggleDropdown}
          disabled={props.disabled}
          selectedOption={props.selectedOption}
          defaultValue={props.defaultValue}
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
      {props.showReset === true && (
        <ResetUI reset={props.resetSelectedOption} />
      )}
    </div>
  )
}

export default SelectUI
