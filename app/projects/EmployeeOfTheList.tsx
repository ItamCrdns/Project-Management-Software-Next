import Image from 'next/image'
import { type Employee } from '@/interfaces/employee'
import useCardVisibility from './useCardVisibility'
import EmployeeCard from '@/components/employeecard/EmployeeCard'
import styles from './userbanner.module.css'

const EmployeeOfTheList = ({
  employee
}: {
  employee: Employee
}): JSX.Element => {
  const { showCard, handleShowCard, handleHideCard } = useCardVisibility()

  return (
    <div className={styles.userwrapper}>
      <li key={employee.username}>
        <Image
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          src={employee.profilePicture}
          alt={employee.username}
          width={25}
          height={25}
        />
      </li>
      {showCard && (
        <section
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          className={styles.employeecard}
        >
          <EmployeeCard employee={employee} isProfile={false} />
        </section>
      )}
    </div>
  )
}

export default EmployeeOfTheList
