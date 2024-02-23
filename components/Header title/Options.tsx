interface OptionsProps {
  text: string
  toggle: boolean
  handleToggle: () => void
}

const Options: React.FC<OptionsProps> = (props) => {
  const { toggle, handleToggle } = props
  return (
    <div className='flex items-center gap-2'>
      <p className='cursor-pointer select-none' onClick={handleToggle}>
        {props.text}
      </p>
      <div onClick={handleToggle}>
        {!toggle
          ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-5 h-5'
          >
            <path
              fillRule='evenodd'
              d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
              clipRule='evenodd'
            />
          </svg>
            )
          : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-5 h-5'
          >
            <path
              fillRule='evenodd'
              d='M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z'
              clipRule='evenodd'
            />
          </svg>
            )}
      </div>
    </div>
  )
}

export default Options
