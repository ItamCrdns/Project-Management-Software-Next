'use client'
import Image from 'next/image'
import { type Employee } from '@/interfaces/employee'
import useCardVisibility from '@/components/Generic Entity Renderer/useCardVisibility'
import EmployeeCard from '@/components/employeecard/EmployeeCard'
import styles from '@/app/projects/(list)/userbanner.module.css'

export interface Position {
  // ? Use rem or px
  top?: string
  left?: string
  right?: string
  bottom?: string
}

interface EmployeeListProps {
  employee: Employee
  size: number // Size in px for the image should be provided only one: ex: 25x25 or 50x50
  redirectMe: boolean // * Should we redirect to the employee profile or not? prop drilling
  position?: Position
}

const EmployeeOfTheList: React.FC<EmployeeListProps> = (props) => {
  const { showCard, handleShowCard, handleHideCard } = useCardVisibility()

  // ? Positions for the card (if necessary) will override the default top 1.75rem in the css file
  const style: Position = {
    top: props.position?.top,
    left: props.position?.left,
    right: props.position?.right,
    bottom: props.position?.bottom
  }

  return (
    <>
      <li className={styles.userwrapper} key={props.employee.employeeId}>
        <Image
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          src={props.employee.profilePicture}
          alt={props.employee.username}
          width={props.size}
          height={props.size}
        />
      </li>
      {showCard && (
        <section
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          className={styles.employeecard}
          style={style}
        >
          <EmployeeCard
            employee={props.employee}
            isProfile={false}
            redirectMe={props.redirectMe}
          />
        </section>
      )}
    </>
  )
}

export default EmployeeOfTheList
