'use client'
import Image from 'next/image'
import useCardVisibility from '@/components/Generic Entity Renderer/useCardVisibility'
import EmployeeCard from '@/components/employeecard/EmployeeCard'
import { type Position, type EmployeeListProps } from './IEmployeeListProps'
import NoPicture from '../No profile picture/NoPicture'
import Link from 'next/link'

const IndividualEmployee: React.FC<EmployeeListProps> = (props) => {
  const { showCard, handleShowCard, handleHideCard } = useCardVisibility()

  // * Override default position
  const cardPosition: Position = {
    top: props.position?.top,
    left: props.position?.left,
    right: props.position?.right,
    bottom: props.position?.bottom
  }

  const { employee, showName } = props

  return (
    <>
      <div className='flex gap-4 items-center'>
        {employee.profilePicture !== null
          ? (
          <Image
            onMouseOver={handleShowCard}
            onMouseLeave={handleHideCard}
            src={employee.profilePicture}
            alt={employee.username}
            width={props.size}
            height={props.size}
            className='rounded-full z-40'
          />
            )
          : (
          <div onMouseOver={handleShowCard} onMouseLeave={handleHideCard}>
            <NoPicture width={props.size + 'px'} height={props.size + 'px'} />
          </div>
            )}
        {showName && (
          <Link href={`/employees/${employee.username}`} className='font-md font-semibold'>{employee.username}</Link>
        )}
      </div>
      {showCard && (
        <section
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          className='absolute -top-2 left-0 p-4 h-84 w-72 flex items-end justify-center'
          style={cardPosition}
        >
          <EmployeeCard
            employee={employee}
            isProfile={false}
            redirectMe={props.redirectMe}
          />
        </section>
      )}
    </>
  )
}

export { IndividualEmployee }
