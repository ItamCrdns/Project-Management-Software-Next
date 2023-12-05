'use client'
import { type Project } from '@/interfaces/project'
import styles from './project.module.css'
import { dateFormatter } from '@/utility/dateFormatter'
import { useState } from 'react'

interface Props {
  project: Project | null
}

const ExpectedDeliveryDate: React.FC<Props> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false)

  // TODO: Fix to work properly with UTC time
  const daysBeforeDeliveryDate = (date: string): number => {
    const today = new Date()
    const deliveryDate = new Date(date)
    const differenceInTime = deliveryDate.getTime() - today.getTime()
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24))
    return differenceInDays
  }

  const { date, color } = dateFormatter(
    props.project?.expectedDeliveryDate ?? ''
  )

  let message = ''
  let backgroundColor = ''
  switch (color) {
    case 'red':
      message = `${daysBeforeDeliveryDate(date)} days before delivery date`
      backgroundColor = 'rgba(249, 76, 16, .25)'
      break
    case 'rgb(144, 12, 63)':
      message = `Delivery date was ${
        daysBeforeDeliveryDate(date) * -1
      } days ago` // * Multiply by -1 to get positive number
      backgroundColor = 'rgba(249, 76, 16, .25)'
      break
    case 'rgba(79, 192, 208, 1)':
      message = `${daysBeforeDeliveryDate(date)} days before delivery date`
      backgroundColor = 'rgba(79, 192, 208, 2.5)'
      break
    case 'rgb(255, 163, 60)':
      message = `${daysBeforeDeliveryDate(date)} days before delivery date`
      backgroundColor = 'rgba(255, 163, 60, .25)'
      break
    default:
      message = 'Default color message'
      backgroundColor = 'rgba(0, 0, 0, .25)'
      break
  }

  return (
    <>
      <p className={styles.grayedtext}>Expected delivery date</p>
      <div className={styles.informationcontainer}>
        <p style={{ color }}>{date}</p>
        <span
          style={{ color }}
          onMouseOver={() => {
            setToggle(true)
          }}
          onMouseLeave={() => {
            setToggle(false)
          }}
          className='material-symbols-outlined'
        >
          info
        </span>
        {toggle && (
          <div style={{ backgroundColor }} className={styles.absolutepopup}>
            <p>{message}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default ExpectedDeliveryDate
