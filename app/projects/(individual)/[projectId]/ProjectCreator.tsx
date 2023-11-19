'use client'
import Image from 'next/image'
import Link from 'next/link'
import styles from './project.module.css'
import pop from '@/app/projects/(list)/userbanner.module.css'
import useCardVisibility from '@/components/Generic Entity Renderer/useCardVisibility'
import EmployeeCard from '@/components/employeecard/EmployeeCard'
import { type Employee } from '@/interfaces/employee'
import { type Position } from '@/components/Generic Entity Renderer/EmployeeOfTheList'

interface ProjectCreatorProps {
  profilePicture: string
  username: string
  creator: Employee
}

const ProjectCreator: React.FC<ProjectCreatorProps> = (props) => {
  const { showCard, handleShowCard, handleHideCard } = useCardVisibility()

  const position: Position = {
    top: '-1.5rem',
    right: '10.75rem'
  }

  return (
    <div className={`${styles.userwrapper} ${pop.userwrapper}`}>
      <Image
        onMouseOver={handleShowCard}
        onMouseLeave={handleHideCard}
        src={props.profilePicture}
        alt={props.username}
        width={45}
        height={45}
      />
      <h3>
        <Link href={`/employees/${props.username}`}>{props.username}</Link>
      </h3>
      {showCard && (
        <section
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          className={pop.employeecard}
          style={position}
        >
          <EmployeeCard
            employee={props.creator}
            isProfile={false}
            redirectMe={true}
          />
        </section>
      )}
    </div>
  )
}

export default ProjectCreator
