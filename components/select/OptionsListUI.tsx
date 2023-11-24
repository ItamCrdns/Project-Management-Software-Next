import Image from 'next/image'
import styles from './select.module.css'
import SelectPaginationUI from './SelectPaginationUI'
import { type SelectUIProps } from './SelectUI'
import { type Option } from '@/interfaces/props/CustomSelectProps'

const OptionsListUI: React.FC<Partial<SelectUIProps>> = (props) => {
  const showPicture = props.showPictures !== null && props.showPictures === true

  const handleClick = (option: Option): void => {
    props.handleOptionClick?.(option)
  }

  // TODO: Pass a prop to specify the text align (center, left or right)

  if (props.toggle === true && Array.isArray(props.options)) {
    return (
      <div className={styles.optionswrapper}>
        <ul>
          {props.options.map((opt) => (
            <li
              onClick={() => {
                handleClick(opt)
              }}
              key={opt.value}
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
          iconSize={props.iconSize}
          isPaginated={props.isPaginated}
        />
      </div>
    )
  }
}

export default OptionsListUI
