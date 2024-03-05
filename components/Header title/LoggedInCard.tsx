'use client'
import { useState } from 'react'
import { Button } from '@/components/Button/Button'
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
    showPictures,
    close
  }

  const buttonProps = {
    text: buttonText ?? '',
    href: buttonHref
  }

  return (
    <section className='flex items-center relative gap-8'>
      <Options text={optionsText} toggle={toggle} handleToggle={handleToggle} />
      {showButton === true && <Button {...buttonProps} />}
      {toggle && <Filters {...filtersProps} />}
    </section>
  )
}

export default LoggedInCard
