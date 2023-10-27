import Image from 'next/image'
import { type Employee } from '@/interfaces/employee'
import useCardVisibility from '@/components/Generic Entity Renderer/useCardVisibility'
import EmployeeCard from '@/components/employeecard/EmployeeCard'
import styles from '@/app/projects/(list)/userbanner.module.css'
import React from 'react'

interface EmployeeListProps {
  employee: Employee
  size: number // Size in px for the image should be provided only one: ex: 25x25 or 50x50
  redirectMe: boolean // * Should we redirect to the employee profile or not? prop drilling
}

const EmployeeOfTheList: React.FunctionComponent<EmployeeListProps> = ({
  employee,
  size,
  redirectMe
}) => {
  const { showCard, handleShowCard, handleHideCard } = useCardVisibility()

  return (
    <div className={styles.userwrapper}>
      <li key={employee.username}>
        <Image
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          src={employee.profilePicture}
          alt={employee.username}
          width={size}
          height={size}
        />
      </li>
      {showCard && (
        <section
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          className={styles.employeecard}
        >
          <EmployeeCard
            employee={employee}
            isProfile={false}
            redirectMe={redirectMe}
          />
        </section>
      )}
    </div>
  )
}

export default EmployeeOfTheList
