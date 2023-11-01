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
  const { date, color } = dateFormatter(
    props.project?.expectedDeliveryDate ?? ''
  )

  let message = ''
  let backgroundColor = ''
  switch (color) {
    case 'red':
      message = 'Red color message'
      backgroundColor = 'rgba(249, 76, 16, .25)'
      break
    case 'rgb(144, 12, 63)':
      message = 'Darker red color message'
      backgroundColor = 'rgba(249, 76, 16, .25)'
      break
    case 'green':
      message = 'Green color message'
      backgroundColor = 'rgba(79, 192, 208, .25)'
      break
    case 'rgb(255, 163, 60)':
      message = 'Yellow color message'
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
          className="material-symbols-outlined"
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
