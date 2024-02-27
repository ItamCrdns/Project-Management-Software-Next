'use client'
import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import EmployeeCard from '@/components/employeecard/EmployeeCard'
import useCardVisibility from '@/components/Generic Entity Renderer/useCardVisibility'
import { type Style } from './EntityRenderer'
import NoPicture from '../No profile picture/NoPicture'

interface EntityCreatorProps {
  creator: Employee
  style: Style
}

const EntityCreator: React.FunctionComponent<EntityCreatorProps> = (props) => {
  const { showCard, handleShowCard, handleHideCard } = useCardVisibility()

  const { creator } = props

  return (
    <>
      <div
        className='flex items-center justify-center gap-2'
        style={props.style}
      >
        {creator.profilePicture !== null
          ? (
          <Image
            onMouseOver={handleShowCard}
            onMouseLeave={handleHideCard}
            src={creator.profilePicture}
            alt={creator.username}
            width={35}
            height={35}
            className='rounded-full'
          />
            )
          : (
          <div onMouseOver={handleShowCard} onMouseLeave={handleHideCard}>
            <NoPicture width='35px' height='35px' />
          </div>
            )}
      </div>
      {showCard && (
        <section
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          style={props.style}
          className='absolute top-2 left-40 p-4 h-84 w-72 flex items-end justify-center'
        >
          <EmployeeCard
            employee={creator}
            isProfile={false}
            redirectMe={true}
          />
        </section>
      )}
    </>
  )
}

export default EntityCreator
