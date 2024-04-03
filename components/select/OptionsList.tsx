import Image from 'next/image'
import { SelectPaginationUI } from './SelectPaginationUI'
import { Button } from '../Button/Button'
import NoPicture from '../No profile picture/NoPicture'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import { Loading } from './Loading'
import { useRef } from 'react'
import { useOutsideClick } from '@/utility/closeOnOutsideClick'

interface OptionsListProps {
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
  scrollable?: boolean
}

const OptionsList: React.FC<OptionsListProps> = (props) => {
  const { handleMultipleOptionClick, handleOptionClick, scrollable } = props

  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick({ ref, closeThis: props.closeDropdown })

  const contrastSelectedOption = (opt: Option, isDark: boolean): string => {
    if (Array.isArray(props.defaultEntities)) {
      return props.defaultEntities.some((e) => e.value === opt.value)
        ? isDark
          ? 'dark-tremor-background-muted font-semibold'
          : 'tremor-background-muted font-semibold'
        : ''
    } else {
      return props.defaultEntities?.value === opt.value
        ? isDark
          ? 'dark-tremor-background-muted font-semibold'
          : 'tremor-background-muted font-semibold'
        : ''
    }
  }

  return (
    <div
      ref={ref}
      className='absolute top-14 right-0 z-50 p-4 text-xs m-0 flex flex-col gap-4 min-w-72 outline-none rounded-tremor-default transition duration-100 border shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis dark:border-dark-tremor-border'
    >
      <div
        className={`flex flex-col ${
          scrollable === true
            ? 'h-40 overflow-y-auto'
            : 'items-center justify-center'
        }`}
      >
        {Array.isArray(props.options) && props.options.length > 0
          ? (
          <ul className='flex flex-col gap-2 w-full'>
            {props.options.map((opt) => (
              <li
                onClick={(event) => {
                  props.multiple === true
                    ? handleMultipleOptionClick?.(opt)
                    : handleOptionClick?.(opt, event)
                }}
                key={opt.value}
                className={`bg-${contrastSelectedOption(
                  opt,
                  false
                )} dark:bg-${contrastSelectedOption(
                  opt,
                  true
                )} flex items-center justify-center gap-4 px-4 py-2 rounded-md cursor-pointer hover:bg-tremor-background-muted hover:opacity-50 dark:hover:bg-dark-tremor-background-muted dark:hover:opacity-50`}
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
                <h4 className='select-none'>{opt.label}</h4>
                <p className='text-right select-none'>{opt.info}</p>
              </li>
            ))}
          </ul>
            )
          : (
          <Loading />
            )}
      </div>
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

export { OptionsList }
