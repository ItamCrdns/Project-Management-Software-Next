import { useRef } from 'react'
import { timeStamps } from './timeStamps'
import { useOutsideClick } from '@/utility/closeOnOutsideClick'
import { type TimesProps } from './Times.interface'
import { Button } from '../Button/Button'
import { Badge } from '@tremor/react'

const Times: React.FC<TimesProps> = (props) => {
  const { close, handleTimeClick, handleMeridiemClick, time } = props

  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick({ ref, closeThis: close })

  const contrastSelectHour = (opt: string, isDark: boolean): string => {
    return time.hour === opt
      ? isDark
        ? 'dark-tremor-background-muted font-semibold'
        : 'tremor-background-muted font-semibold'
      : ''
  }

  const contrastSelectedMeridiem = (opt: string, isDark: boolean): string => {
    return time.meridiemIndicator === opt
      ? isDark
        ? 'dark-tremor-background-muted font-semibold'
        : 'tremor-background-muted font-semibold'
      : ''
  }

  return (
    <div
      ref={ref}
      className='z-999 flex flex-col gap-4 absolute my-2 box-border resize-none text-lg p-4 outline-none rounded-tremor-default transition duration-100 border shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis dark:border-dark-tremor-border'
    >
      <div className='flex gap-4'>
        <div className='overflow-y-auto h-48'>
          {Object.keys(timeStamps).map((time, i) => (
            <div key={i} className='flex items-center justify-center mr-2'>
              <p
                onClick={() => {
                  handleTimeClick(timeStamps[time])
                }}
                className={`bg-${contrastSelectHour(
                  timeStamps[time],
                  false
                )} dark:bg-${contrastSelectHour(
                  timeStamps[time],
                  true
                )} w-14 flex justify-center text-sm p-2 rounded-sm cursor-pointer hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted`}
              >
                {timeStamps[time]}
              </p>
            </div>
          ))}
        </div>
        <div className='text-base select-none w-10'>
          <p
            onClick={() => {
              handleMeridiemClick('AM')
            }}
            className={`bg-${contrastSelectedMeridiem(
              'AM',
              false
            )} dark:bg-${contrastSelectedMeridiem(
              'AM',
              true
            )} rounded-sm cursor-pointer hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted p-2`}
          >
            AM
          </p>
          <p
            onClick={() => {
              handleMeridiemClick('PM')
            }}
            className={`bg-${contrastSelectedMeridiem(
              'PM',
              false
            )} dark:bg-${contrastSelectedMeridiem(
              'PM',
              true
            )} rounded-sm cursor-pointer hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted p-2`}
          >
            PM
          </p>
        </div>
        <div className='py-2 grid gap-4 grid-cols-2 grid-rows-3 h-32 items-start'>
          <Badge
            tooltip='7:00 AM'
            onClick={() => {
              handleTimeClick('7:00')
              handleMeridiemClick('AM')
            }}
            className='cursor-pointer w-auto text-xs p-2'
            color={
              time.hour === '7:00' && time.meridiemIndicator === 'AM'
                ? 'tremor-background-muted'
                : 'gray'
            }
          >
            Morning
          </Badge>
          <Badge
            tooltip='12:00 PM'
            onClick={() => {
              handleTimeClick('12:00')
              handleMeridiemClick('PM')
            }}
            className='cursor-pointer w-auto text-xs p-2'
            color={
              time.hour === '12:00' && time.meridiemIndicator === 'PM'
                ? 'tremor-background-muted'
                : 'gray'
            }
          >
            Noon
          </Badge>
          <Badge
            tooltip='3:00 PM'
            onClick={() => {
              handleTimeClick('3:00')
              handleMeridiemClick('PM')
            }}
            className='cursor-pointer w-auto text-xs p-2'
            color={
              time.hour === '3:00' && time.meridiemIndicator === 'PM'
                ? 'tremor-background-muted'
                : 'gray'
            }
          >
            Afternoon
          </Badge>
          <Badge
            tooltip='6:00 PM'
            onClick={() => {
              handleTimeClick('6:00')
              handleMeridiemClick('PM')
            }}
            className='cursor-pointer w-auto text-xs p-2'
            color={
              time.hour === '6:00' && time.meridiemIndicator === 'PM'
                ? 'tremor-background-muted'
                : 'gray'
            }
          >
            Evening
          </Badge>
          <Badge
            tooltip='10:00 PM'
            onClick={() => {
              handleTimeClick('10:00')
              handleMeridiemClick('PM')
            }}
            className='cursor-pointer w-auto text-xs p-2'
            color={
              time.hour === '10:00' && time.meridiemIndicator === 'PM'
                ? 'tremor-background-muted'
                : 'gray'
            }
          >
            Night
          </Badge>
          <Badge
            tooltip='12:00 AM'
            onClick={() => {
              handleTimeClick('12:00')
              handleMeridiemClick('AM')
            }}
            className='cursor-pointer w-auto text-xs p-2'
            color={
              time.hour === '12:00' && time.meridiemIndicator === 'AM'
                ? 'tremor-background-muted'
                : 'gray'
            }
          >
            Midnight
          </Badge>
        </div>
      </div>
      <Button text='Close' func={close} />
    </div>
  )
}

export { Times }
