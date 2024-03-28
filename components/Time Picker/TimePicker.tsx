import { ArrowDown } from '@/svg/ArrowDown'
import { Clock } from '@/svg/Clock'
import { useEffect, useState } from 'react'
import { Times } from './Times'
import { type Time, type TimePickerProps } from './TimePicker.interface'

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const { error, disabled, handleTimeClick } = props

  const [toggle, setToggle] = useState<boolean>(false)

  const [time, setTime] = useState<Time>({
    hour: '12:00',
    meridiemIndicator: 'AM'
  })

  useEffect(() => {
    let numericHour = Number(time.hour.split(':')[0])

    if (time.meridiemIndicator === 'AM' && numericHour === 12) {
      numericHour = 0
    } else if (time.meridiemIndicator === 'PM' && numericHour < 12) {
      numericHour += 12
    }

    handleTimeClick({
      hour: `${numericHour}:${time.hour.split(':')[1]}`,
      meridiemIndicator: time.meridiemIndicator
    })
  }, [time])

  return (
    <>
      <div
        onClick={() => {
          if (disabled === true) {
            return
          }

          setToggle(!toggle)
        }}
        className={`relative flex items-center justify-between gap-2 w-full box-border resize-none text-lg overflow-hidden min-w-full p-2 outline-none rounded-tremor-default transition duration-100 border shadow-tremor-input dark:shadow-dark-tremor-input ${
          disabled === true
            ? 'cursor-not-allowed'
            : 'bg-tremor-background dark:bg-dark-tremor-background'
        } ${
          disabled === false
            ? 'cursor-pointer hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted'
            : ''
        } text-tremor-content-emphasis dark:text-dark-tremor-cozntent-emphasis ${
          error === true ? 'border-red-500' : 'border-tremor-border'
        } ${
          error === true ? 'border-red-500' : 'dark:border-dark-tremor-border'
        }`}
      >
        {disabled === true && (
          <div className='absolute top-0 left-0 w-full h-full bg-black z-10 opacity-10'></div>
        )}
        <Clock />
        <div className='absolute left-10 top-0 h-full flex flex-col justify-center'>
          <p className='text-xs text-azure-radiance-500 select-none'>
            Expected delivery time
          </p>
          <p className='text-xs select-none w-14'>
            {time.hour} {time.meridiemIndicator}
          </p>
        </div>
        <ArrowDown />
      </div>
      {toggle && (
        <Times
          close={() => {
            setToggle(false)
          }}
          handleTimeClick={(time) => {
            setTime((prevTime) => {
              return { ...prevTime, hour: time }
            })
          }}
          handleMeridiemClick={(meridiem) => {
            setTime((prevTime) => {
              return { ...prevTime, meridiemIndicator: meridiem }
            })
          }}
          time={time}
        />
      )}
    </>
  )
}

export { TimePicker }
