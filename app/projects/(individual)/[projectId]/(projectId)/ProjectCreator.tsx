'use client'
import Image from 'next/image'
import Link from 'next/link'
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
    <div className='flex items-center gap-3 relative'>
      {profilePicture !== null
        ? (
        <Image
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          src={profilePicture}
          alt={username}
          width={props.pictureSize ?? 45}
          height={props.pictureSize ?? 45}
          className='rounded-full'
        />
          )
        : (
        <div onMouseOver={handleShowCard} onMouseLeave={handleHideCard}>
          <NoPicture width='45px' height='45px' />
        </div>
          )}
      {props.showUsername && (
        <Link
          className='font-semibold capitalize text-theming-dark100 dark:text-theming-white100'
          href={`/employees/${username}`}
        >
          {username}
        </Link>
      )}
      {showCard && (
        <section
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          className='absolute z-50'
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
