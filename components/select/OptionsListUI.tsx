import Image from 'next/image'
import styles from './select.module.css'
import SelectPaginationUI from './SelectPaginationUI'
import { type SelectUIProps } from './SelectUI'
import RippleButton from '../ripplebutton/RippleButton'
import NoPicture from '../No profile picture/NoPicture'
import { type Option } from '@/interfaces/props/CustomSelectProps'

const OptionsListUI: React.FC<Partial<SelectUIProps>> = (props) => {
  const { handleMultipleOptionClick, handleOptionClick } = props

  const contrastSelectedOption = (opt: Option): string => {
    if (Array.isArray(props.defaultEntities)) {
      return props.defaultEntities.some((e) => e.value === opt.value) ? 'var(--banner-color)' : ''
    } else {
      return props.defaultEntities?.value === opt.value ? 'var(--banner-color)' : ''
    }
  }

  if (props.shouldShowDropdown === true && Array.isArray(props.options)) {
    return (
      <div className={styles.optionswrapper}>
        <ul>
          {props.options.map((opt) => (
            <li
              onClick={(event) => {
                props.multiple === true
                  ? handleMultipleOptionClick?.(opt)
                  : handleOptionClick?.(opt, event)
              }}
              key={opt.value}
              style={{ backgroundColor: contrastSelectedOption(opt) }}
            >
              {props.showPictures === true &&
                (opt.picture !== undefined &&
                opt.picture !== '' &&
                opt.picture !== null
                  ? (
                  <Image
                    src={opt.picture}
                    alt={opt.label}
                    width={25}
                    height={25}
                    className='rounded-full'
                  />
                    )
                  : (
                  <NoPicture width='25px' height='25px' />
                    ))}
              <h4>{opt.label}</h4>
              <p style={{ textAlign: 'right' }}>{opt.info}</p>
            </li>
          ))}
        </ul>
        <SelectPaginationUI
          pageSize={props.pageSize}
          onPageChange={props.onPageChange}
          isPaginated={props.isPaginated}
        />
        {props.showCloseButton === true && (
          <RippleButton
            text='Close'
            backgroundColor='rgb(255, 80, 120)'
            textColor='white'
            func={() => props.closeDropdown?.()}
          />
        )}
      </div>
    )
  }
}

export default OptionsListUI
