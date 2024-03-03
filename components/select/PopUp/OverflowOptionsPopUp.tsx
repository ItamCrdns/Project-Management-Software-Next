// * When hovering the "+number", show a popup with options that arent being displayed

import { type Option } from '@/interfaces/props/CustomSelectProps'
import NoPicture from '../../No profile picture/NoPicture'
import Image from 'next/image'

const OverflowOptionsPopUp: React.FC<{ options: Option[] }> = (props) => {
  return (
    <ul className='absolute top-2 left-0 m-6 bg-theming-white100 dark:bg-theming-dark100 py-2 px-6 z-999 rounded-md shadow-md'>
      {props.options.map((opt) => (
        <li
          key={opt.value}
          className='flex items-center justify-center gap-2 p-2 rounded-md cursor-pointer hover:bg-theming-white200 dark:hover:bg-theming-dark300'
        >
          {opt.picture !== undefined
            ? (
            <Image
              src={opt.picture}
              alt={opt.label}
              width={25}
              height={25}
              className='rounded-full'
            />
              )
            : (
            <NoPicture width='25px' height='25px' />
              )}
          <span className='capitalize text-sm text-black dark:text-white'>
            {opt.label}
          </span>
        </li>
      ))}
    </ul>
  )
}

export { OverflowOptionsPopUp }
