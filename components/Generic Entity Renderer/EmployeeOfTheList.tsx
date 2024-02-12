'use client'
import Image from 'next/image'
import useCardVisibility from '@/components/Generic Entity Renderer/useCardVisibility'
import EmployeeCard from '@/components/employeecard/EmployeeCard'
import styles from '@/app/projects/(list)/userbanner.module.css'
import { type Position, type EmployeeListProps } from './IEmployeeListProps'
import NoPicture from '../No profile picture/NoPicture'

const EmployeeOfTheList: React.FC<EmployeeListProps> = (props) => {
  const { showCard, handleShowCard, handleHideCard } = useCardVisibility()

  // ? Positions for the card (if necessary) will override the default top 1.75rem in the css file
  const style: Position = {
    top: props.position?.top,
    left: props.position?.left,
    right: props.position?.right,
    bottom: props.position?.bottom
  }

  const { employee } = props

  return (
    <>
      <li className={styles.userwrapper} key={props.employee.employeeId}>
        {employee.profilePicture !== null
          ? (
          <Image
            onMouseOver={handleShowCard}
            onMouseLeave={handleHideCard}
            src={employee.profilePicture}
            alt={employee.username}
            width={props.size}
            height={props.size}
          />
            )
          : (
          <div onMouseOver={handleShowCard} onMouseLeave={handleHideCard}>
            <NoPicture width={props.size + 'px'} height={props.size + 'px'} />
          </div>
            )}
      </li>
      {showCard && (
        <section
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          className={styles.employeecard}
          style={style}
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

export default EmployeeOfTheList
