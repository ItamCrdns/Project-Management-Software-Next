'use client'
import { type Employee } from '@/interfaces/employee'
import styles from './userbanner.module.css'
import Image from 'next/image'
import EmployeeCard from '@/components/employeecard/EmployeeCard'
import useCardVisibility from './useCardVisibility'

interface ProjectCreatorProps {
  creator: Employee
}

const ProjectCreator = ({ creator }: ProjectCreatorProps): JSX.Element => {
  const { showCard, handleShowCard, handleHideCard } = useCardVisibility()

  return (
    <div className={styles.userwrapper}>
      <Image
        onMouseOver={handleShowCard}
        onMouseLeave={handleHideCard}
        src={creator.profilePicture}
        alt={creator.username}
        width={25}
        height={25}
      />
      <p>{creator.username}</p>
      {showCard && (
        <section
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          className={styles.employeecard}
        >
          <EmployeeCard employee={creator} isProfile={false} />
        </section>
      )}
    </div>
  )
}

export default ProjectCreator
