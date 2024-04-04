// * Same as overflowOptionsPopUp.tsx, but for single option

import NoPicture from '@/components/No profile picture/NoPicture'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import Image from 'next/image'

const OptionPopUp: React.FC<{ option: Option }> = (props) => {
  return (
    <div className='absolute top-6 left-0 m-6 bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis py-2 px-6 z-999 rounded-md shadow-md'>
      <div className='flex items-center justify-center gap-2 p-2 rounded-md cursor-pointer hover:bg-theming-white200 dark:hover:bg-theming-dark300'>
        {props.option.picture !== undefined
          ? (
          <Image
            src={props.option.picture}
            alt={props.option.label}
            width={25}
            height={25}
            className='rounded-full'
          />
            )
          : (
          <NoPicture width='25px' height='25px' />
            )}
        <span className='capitalize text-sm text-black dark:text-white'>
          {props.option.label}
        </span>
      </div>
    </div>
  )
}

export { OptionPopUp }
