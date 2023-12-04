import Image from 'next/image'
import { type SelectUIProps } from './SelectUI'
import styles from './select.module.css'
import DefaultValue from './DefaultValue'

// TODO: SPAN STYLE DOWN BELOW IS NOT WORKING WHEN WE GO BACK IN THE NEW PROJECT PAGE. FIX IT (MAYBE?)
// TODO: Clicking outside should close the dropdown

const OptionsInitialUI: React.FC<Partial<SelectUIProps>> = (props) => {
  const disabledOrNotText = {
    color: props.disabled === true ? 'gray' : 'var(--text-color)'
  }

  const selectedOptImg = props.selectedOption?.picture ?? ''

  const showPicture =
    props.showPictures !== null &&
    props.showPictures === true &&
    selectedOptImg !== ''

  return (
    <div
      onClick={() => props.onShowDropdown?.()}
      className={styles.optionselected}
    >
      {showPicture && (
        <Image
          src={props.selectedOption?.picture as string}
          alt={props.selectedOption?.label as string}
          width={25}
          height={25}
        />
      )}
      <div style={disabledOrNotText}>
        {props.selectedOption !== null
          ? (
              (
            <span style={{ textTransform: 'capitalize', fontWeight: '600' }}>
              {props.selectedOption?.label}
            </span>
              ) ?? ''
            )
          : (
          <DefaultValue
            defaultValue={props.defaultValue as string | string[]}
            defaultText={props.text as string}
          />
            )}
      </div>
      <span className='material-symbols-outlined'>expand_more</span>
    </div>
  )
}

export default OptionsInitialUI
