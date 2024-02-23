'use client'
import Image from 'next/image'
import Link from 'next/link'
import styles from './project.module.css'
import useCardVisibility from '@/components/Generic Entity Renderer/useCardVisibility'
import EmployeeCard from '@/components/employeecard/EmployeeCard'
import { type Employee } from '@/interfaces/employee'
import { type Position } from '@/components/Generic Entity Renderer/IEmployeeListProps'
import NoPicture from '@/components/No profile picture/NoPicture'

interface ProjectCreatorProps {
  creator: Employee
  position?: Position
  pictureSize?: number
  showUsername: boolean
}

const ProjectCreator: React.FC<ProjectCreatorProps> = (props) => {
  const { showCard, handleShowCard, handleHideCard } = useCardVisibility()

  const username = props.creator.username
  const profilePicture = props.creator.profilePicture

  const position: Position = {
    top: props.position?.top ?? '-1.5rem',
    right: props.position?.right ?? '10.75rem'
  }

  return (
    <div className={styles.userwrapper}>
      {profilePicture !== null
        ? (
        <Image
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          src={profilePicture}
          alt={username}
          width={props.pictureSize ?? 45}
          height={props.pictureSize ?? 45}
        />
          )
        : (
        <div onMouseOver={handleShowCard} onMouseLeave={handleHideCard}>
          <NoPicture width='45px' height='45px' />
        </div>
          )}
      {props.showUsername && (
        <h3>
          <Link href={`/employees/${username}`}>{username}</Link>
        </h3>
      )}
      {showCard && (
        <section
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
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
