'use client'
import { useState } from 'react'
import styles from '@/app/projects/(list)/userbanner.module.css'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { type LoggedInCardProps } from '@/interfaces/props/LoggedInCardProps'
import EntityFilters from './EntityFilters'
import Options from './Options'

const LoggedInCard: React.FC<LoggedInCardProps> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false)

  const handleToggle = (): void => {
    setToggle(!toggle)
  }

  return (
    <section className={styles.banner}>
      <Options
        text={props.optionsText}
        toggle={toggle}
        handleToggle={handleToggle}
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
