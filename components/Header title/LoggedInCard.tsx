'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { type Employee } from '@/interfaces/employee'
import styles from '@/app/projects/(list)/userbanner.module.css'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { type LoggedInCardProps } from '@/interfaces/props/LoggedInCardProps'
import EntityFilters from './EntityFilters'
import Options from './Options'

const LoggedInCard: React.FC<LoggedInCardProps> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false)

  let currentUser: Employee | null = null

  if (props.showPicture !== null && props.showPicture === true) {
    const { user } = useAuth()
    currentUser = user as Employee
  }

  const handleToggle = (): void => {
    setToggle(!toggle)
  }

  return (
    <section className={styles.banner}>
      <Options
        text={props.optionsText}
        toggle={toggle}
        handleToggle={handleToggle}
        user={currentUser}
      />
      {props.showButton !== null && props.showButton === true && (
        <RippleButton
          text={props.buttonText ?? ''}
          icon="add"
          iconSize="20px"
          width={props.buttonWidth ?? '125px'}
          href={props.buttonHref}
        />
      )}
      <EntityFilters entityName={props.entityName} toggle={toggle} />
    </section>
  )
}

export default LoggedInCard
