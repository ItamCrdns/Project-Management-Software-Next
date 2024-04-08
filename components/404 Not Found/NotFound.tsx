import { Button } from '../Button/Button'

const NotFound: React.FC<{
  text: string // * Text to display
  buttonText: string // * Text for button
  func?: () => void // * Function to run
  href?: string // * Or URL to redirect to, only pass one
}> = (props) => {
  const { text, buttonText, func, href } = props

  return (
    <div className='flex flex-col items-center gap-4 p-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <h1 className='text-xl font-semibold text-center'>{text}</h1>
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
