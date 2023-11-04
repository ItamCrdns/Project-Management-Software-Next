import { useState } from 'react'
import styles from './newProject.module.css'
import { type ExpectedDeliveryDateSelectorProps } from '@/interfaces/props/ExpectedDeliveryDateSelectorProps'

const ExpectedDeliveryDateSelector: React.FC<
ExpectedDeliveryDateSelectorProps
> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false)

  const getDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const date = e.target.value.toString()
    props.getDate(date) // * Pass the date to the parent component
  }

  return (
    <>
      <div className={styles.tinytitlewrapper}>
        <p>Expected delivery date</p>
        <span
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
          <div className={styles.absolutepopup}>
            <p>Date we expect the project to be finalized.</p>
          </div>
        )}
      </div>
      <input
        onChange={getDate}
        type="date"
        defaultValue={props.defaultValue ?? ''}
      />
    </>
  )
}

export default ExpectedDeliveryDateSelector
