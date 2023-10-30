'use client'
import { type Employee } from '@/interfaces/employee'
import styles from '@/app/projects/(list)/userbanner.module.css'
import Image from 'next/image'
import EmployeeCard from '@/components/employeecard/EmployeeCard'
import useCardVisibility from '@/components/Generic Entity Renderer/useCardVisibility'
import { type Style } from './EntityRenderer'

interface EntityCreatorProps {
  creator: Employee
  style: Style
}

const EntityCreator: React.FunctionComponent<EntityCreatorProps> = (props) => {
  const { showCard, handleShowCard, handleHideCard } = useCardVisibility()

  return (
    <div style={props.style} className={styles.userwrapper}>
      <Image
        onMouseOver={handleShowCard}
        onMouseLeave={handleHideCard}
        src={props.creator.profilePicture}
        alt={props.creator.username}
        width={50}
        height={50}
      />
      {showCard && (
        <section
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          className={styles.employeecard}
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

export default EntityCreator
