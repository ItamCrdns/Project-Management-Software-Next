import Image from 'next/image'
import { SelectPaginationUI } from './SelectPaginationUI'
import { Button } from '../Button/Button'
import NoPicture from '../No profile picture/NoPicture'
import { type Option } from '@/interfaces/props/CustomSelectProps'

interface OptionsListProps {
  shouldShowDropdown?: boolean
  closeDropdown: () => void
  options?: Option[]
  handleOptionClick?: (option: Option, event: React.MouseEvent) => void
  handleMultipleOptionClick?: (option: Option) => void
  pageSize?: number
  onPageChange?: (page: number) => void
  isPaginated?: boolean
  multiple?: boolean
  showCloseButton?: boolean
  defaultEntities?: Option | Option[]
  showPictures?: boolean
}

const OptionsList: React.FC<OptionsListProps> = (props) => {
  const { handleMultipleOptionClick, handleOptionClick } = props

  const contrastSelectedOption = (opt: Option, isDark: boolean): string => {
    if (Array.isArray(props.defaultEntities)) {
      return props.defaultEntities.some((e) => e.value === opt.value)
        ? isDark
          ? 'dark300'
          : 'white200'
        : ''
    } else {
      return props.defaultEntities?.value === opt.value
        ? isDark
          ? 'dark300'
          : 'white200'
        : ''
    }
  }

  if (props.shouldShowDropdown === true && Array.isArray(props.options)) {
    return (
      <div className='absolute top-14 right-0 z-50 rounded-md p-4 text-xs m-0 flex flex-col gap-4 shadow-md min-w-72 bg-theming-white100 dark:bg-theming-dark200'>
        <ul className='flex flex-col gap-2'>
          {props.options.map((opt) => (
            <li
              onClick={(event) => {
                props.multiple === true
                  ? handleMultipleOptionClick?.(opt)
                  : handleOptionClick?.(opt, event)
              }}
              key={opt.value}
              className={`bg-theming-${contrastSelectedOption(
                opt,
                false
              )} dark:bg-theming-${contrastSelectedOption(
                opt,
                true
              )} flex items-center justify-center gap-4 p-2 rounded-md cursor-pointer hover:bg-theming-white200 dark:hover:bg-theming-dark300`}
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
              <p className='text-right'>{opt.info}</p>
            </li>
          ))}
        </ul>
        <SelectPaginationUI
          pageSize={props.pageSize}
          onPageChange={props.onPageChange}
          isPaginated={props.isPaginated}
        />
        {props.showCloseButton === true && (
          <Button
            text='Close'
            func={() => {
              props.closeDropdown?.()
            }}
          />
        )}
      </div>
    )
  }
}

export { OptionsList }
