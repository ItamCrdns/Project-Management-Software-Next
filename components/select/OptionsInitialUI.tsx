import Image from 'next/image'
import { type SelectUIProps } from './SelectUI'
import styles from './select.module.css'
import DefaultValue from './DefaultValue'

const OptionsInitialUI: React.FC<Partial<SelectUIProps>> = (props) => {
  const disabledOrNotText = {
    color: props.disabled === true ? 'gray' : 'var(--text-color)'
  }

  const selectedOptImg = props.selectedOption?.picture ?? ''

  return (
    <div
      onClick={() => props.onShowDropdown?.()}
      className={styles.optionselected}
    >
      {selectedOptImg !== '' && (
        <Image
          src={props.selectedOption?.picture as string}
          alt={props.selectedOption?.label as string}
          width={25}
          height={25}
          className='rounded-full'
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
          <DefaultValue defaultValue={props.defaultValue} />
            )}
      </div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
        fill='currentColor'
        className='w-5 h-5'
      >
        <path
          fillRule='evenodd'
          d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
          clipRule='evenodd'
        />
      </svg>
    </div>
  )
}

export default OptionsInitialUI
