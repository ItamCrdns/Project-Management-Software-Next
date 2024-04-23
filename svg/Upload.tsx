import { type IIconSize } from './iconSizeProps'

const Upload = ({ size = 'medium' }: IIconSize): JSX.Element => {
  let defSize = 'w-6 h-6'

  switch (size) {
    case 'small':
      defSize = 'w-4 h-4'
      break
    case 'medium':
      defSize = 'w-6 h-6'
      break
    case 'large':
      defSize = 'w-8 h-8'
      break
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={defSize}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15'
      />
    </svg>
  )
}

export { Upload }
