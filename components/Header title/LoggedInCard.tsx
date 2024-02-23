'use client'
import { useState } from 'react'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { type LoggedInCardProps } from '@/interfaces/props/LoggedInCardProps'
import Options from './Options'
import Filters from '../Filters/Filters'

const LoggedInCard: React.FC<LoggedInCardProps> = (props) => {
  const {
    optionsText,
    showButton,
    buttonText,
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
    href: buttonHref,
    backgroundColor: 'var(--blue)',
    textColor: 'white'
  }

  return (
    <section className='flex items-center relative gap-8'>
      <Options text={optionsText} toggle={toggle} handleToggle={handleToggle} />
      {showButton === true && <RippleButton {...rippleButtonProps} />}
      {toggle && <Filters {...filtersProps} />}
    </section>
  )
}

export default LoggedInCard
