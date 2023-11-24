import Image from 'next/image'
import styles from './select.module.css'
import SelectPaginationUI from './SelectPaginationUI'
import { type SelectUIProps } from './SelectUI'
import { type Option } from '@/interfaces/props/CustomSelectProps'

const OptionsListUI: React.FC<Partial<SelectUIProps>> = (props) => {
  const showPicture = props.showPictures !== null && props.showPictures === true

  const handleSingleSelection = (option: Option): void => {
    props.handleOptionClick?.(option)
  }

  const handleMultipleSelection = (option: Option): void => {
    props.handleMultipleOptionClick?.(option)
  }

  const handleClick = (option: Option): void => {
    props.multiple === true
      ? handleMultipleSelection(option)
      : handleSingleSelection(option)
  }

  const handleClose = (): void => {
    props.handleToggleDropdown?.(false)
  }

  // TODO: Maybe make that the default selected values can come from the URL
  // TODO: Because currently, the come from the parent component as a State
  // TODO: This whole thing its a client component. Just use NextJS navigation hooks to get the stuff
  const selectedEmployees = props.selectedOptions

  // TODO: Pass a prop to specify the text align (center, left or right)

  if (props.toggle === true && Array.isArray(props.options)) {
    return (
      <div className={styles.optionswrapper}>
        <span onClick={handleClose} className={`material-symbols-outlined ${styles.closebtn}`}>
          close
        </span>
        <ul>
          {props.options.map((opt) => (
            <li
              onClick={() => {
                handleClick(opt)
              }}
              key={opt.value}
              style={{
                background:
                  selectedEmployees !== undefined &&
                  selectedEmployees?.some((e) => e.value === opt.value) // * Highlight selected options
                    ? 'var(--banner-color)'
                    : ''
              }}
            >
              {showPicture && (
                <Image
                  src={opt.picture ?? ''}
                  alt={opt.label ?? ''}
                  width={25}
                  height={25}
                />
              )}
              <h4>{opt.label}</h4>
              <p>{opt.info}</p>
            </li>
          ))}
        </ul>
        <SelectPaginationUI
          pageSize={props.pageSize}
          onPageChange={props.onPageChange}
          isPaginated={props.isPaginated}
        />
      </div>
    )
  }
}

export default OptionsListUI
