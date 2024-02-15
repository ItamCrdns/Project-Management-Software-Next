'use client'
import { useState } from 'react'
import styles from '@/app/projects/(list)/userbanner.module.css'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { type LoggedInCardProps } from '@/interfaces/props/LoggedInCardProps'
import Options from './Options'
import Filters from '../Filters/Filters'

const LoggedInCard: React.FC<LoggedInCardProps> = (props) => {
  const {
    optionsText,
    showButton,
    buttonText,
    buttonWidth,
    buttonHref,
    entityName,
    isDashboard,
    isPage,
    showPictures
  } = props

  const [toggle, setToggle] = useState<boolean>(false)

  const handleToggle = (): void => {
    setToggle(!toggle)
  }

  const close = (): void => {
    setToggle(false)
  }

  const filtersProps = {
    entityName,
    isDashboard,
    isPage,
    showPictures,
    close
  }

  const rippleButtonProps = {
    text: buttonText ?? '',
    icon: 'add',
    width: buttonWidth ?? '125px',
    href: buttonHref
  }

  return (
    <section className={styles.banner}>
      <Options text={optionsText} toggle={toggle} handleToggle={handleToggle} />
      {showButton === true && <RippleButton {...rippleButtonProps} />}
      {toggle && <Filters {...filtersProps} />}
    </section>
  )
}

export default LoggedInCard
