import Image from 'next/image'
import { type SelectUIProps } from './SelectUI'
import styles from './select.module.css'

const OptionsInitialUI: React.FC<Partial<SelectUIProps>> = (props) => {
  // TODO: Make it so you can pass the whole text. Will need to adjust all the places I am using this component and probably will have to update the CSS if the text its too big.

  const disabledOrNotText = {
    color: props.disabled === true ? 'gray' : 'var(--text-color)'
  }

  const label = props.selectedOption?.label ?? ''
  const defaultValue = props.defaultValue

  const selectedOptImg = props.selectedOption?.picture ?? ''
  const selectOptLabel = props.selectedOption?.label ?? ''

  const handleToggle = props.handleToggleDropdown

  const showPicture =
    props.showPictures !== null &&
    props.showPictures === true &&
    selectedOptImg !== ''

  // TODO: Would be good if the selected option wrapper could expand its size to fix the text in (currently the text its going outisde the wrapper)
  // TODO: Might also rework Select Component CSS. I think it could be better.
  return (
    <div onClick={handleToggle} className={styles.optionselected}>
      {showPicture && (
        <Image
          src={selectedOptImg}
          alt={selectOptLabel}
          width={25}
          height={25}
        />
      )}
      <p style={disabledOrNotText}>
        {props.selectedOption !== null
          ? label ?? ''
          : defaultValue !== ''
            ? defaultValue
            : `Select a ${props.text}...`}
      </p>
      <span className="material-symbols-outlined">expand_more</span>
    </div>
  )
}

export default OptionsInitialUI
