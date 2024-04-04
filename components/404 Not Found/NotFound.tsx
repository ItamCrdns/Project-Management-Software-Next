'use client'
import { Badge } from '@tremor/react'
import { Button } from '../Button/Button'

const NotFound: React.FC<{
  text: string // * Text to display
  buttonText: string // * Text for button
  func?: () => void // * Function to run
  href?: string // * Or URL to redirect to, only pass one
}> = (props) => {
  const { text, buttonText, func, href } = props

  return (
    <div className='flex flex-col items-center gap-8'>
      <Badge>
        <h1 className='px-4 py-2'>{text}</h1>
      </Badge>
      {func !== undefined
        ? (
        <Button text={buttonText} func={func} />
          )
        : href !== undefined
          ? (
        <Button text={buttonText} href={href} />
            )
          : null}
    </div>
  )
}

export { NotFound }
