import Image from 'next/image'
import { ArrowDown } from './ArrowDown'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import NoPicture from '../No profile picture/NoPicture'
import { useState } from 'react'
import { OverflowOptionsPopUp } from './PopUp/OverflowOptionsPopUp'
import { OptionPopUp } from './PopUp/OptionPopUp'

interface CurrentOptionsProps {
  selectedOption?: Option | null
  disabled: boolean
  defaultValue?: string
  defaultEntities?: Option[]
  onShowDropdown?: () => void
}

const CurrentOption: React.FC<CurrentOptionsProps> = (props) => {
  const { defaultValue, defaultEntities, selectedOption } = props

  const firstFourValues =
    Array.isArray(defaultEntities) && defaultEntities.length > 4
      ? defaultEntities.slice(0, 4)
      : []

  const lastValues =
    Array.isArray(defaultEntities) && defaultEntities.length > 4
      ? defaultEntities.slice(4)
      : []

  const handleOpenDropdown = (): void => {
    if (props.disabled) return
    props.onShowDropdown?.()
  }

  const [showOverflowPopUp, setShowOverflowPopUp] = useState<boolean>(false)
  const [showPopUp, setShowPopUp] = useState<Option | null>(null)

  return (
    <div
      onClick={handleOpenDropdown}
      className='flex items-center justify-end gap-4 select-none cursor-pointer'
    >
      {selectedOption !== null && selectedOption !== undefined
        ? (
        <span className='text-black dark:text-white text-sm'>
          {selectedOption?.label}
        </span>
          )
        : Array.isArray(defaultEntities) && defaultEntities.length > 0
          ? (
        <ul className='flex flex-row'>
          {defaultEntities.length > 4
            ? (
            <>
              {firstFourValues.map((v, i) => (
                <li className='flex items-center justify-center px-1' key={i}>
                  {v.picture !== undefined
                    ? (
                    <div
                      onMouseEnter={() => {
                        setShowPopUp(v)
                      }}
                      onMouseLeave={() => {
                        setShowPopUp(null)
                      }}
                      className='relative'
                    >
                      <Image
                        src={v.picture}
                        alt={v.label}
                        width={25}
                        height={25}
                        className='rounded-full'
                      />
                      {showPopUp === v && <OptionPopUp option={v} />}
                    </div>
                      )
                    : (
                    <NoPicture width='25px' height='25px' />
                      )}
                </li>
              ))}
              <div
                onMouseEnter={() => {
                  setShowOverflowPopUp(true)
                }}
                onMouseLeave={() => {
                  setShowOverflowPopUp(false)
                }}
                className='relative rounded-full w-25 h-25 flex items-center justify-center bg-theming-white100 dark:bg-theming-dark300'
              >
                <span className='text-xs'>+{defaultEntities.length - 4}</span>
                {showOverflowPopUp && (
                  <OverflowOptionsPopUp options={lastValues} />
                )}
              </div>
            </>
              )
            : (
                defaultEntities.map((v, i) => (
              <li className='flex items-center justify-center px-1' key={i}>
                {v.picture !== undefined
                  ? (
                  <div
                    onMouseEnter={() => {
                      setShowPopUp(v)
                    }}
                    onMouseLeave={() => {
                      setShowPopUp(null)
                    }}
                    className='relative'
                  >
                    <Image
                      src={v.picture}
                      alt={v.label}
                      width={25}
                      height={25}
                      className='rounded-full'
                    />
                    {showPopUp === v && <OptionPopUp option={v} />}
                  </div>
                    )
                  : (
                  <NoPicture width='25px' height='25px' />
                    )}
              </li>
                ))
              )}
        </ul>
            )
          : (
        <p
          className={`text-black dark:text-white text-sm ${
            props.disabled ? 'text-gray-400 cursor-not-allowed' : ''
          }`}
        >
          {defaultValue}
        </p>
            )}
      <ArrowDown />
    </div>
  )
}

export { CurrentOption }
