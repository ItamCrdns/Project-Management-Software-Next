import Image from 'next/image'
import NoPicture from '../No profile picture/NoPicture'

interface DefaultValueProps {
  disabled?: boolean
  defaultValue?: string | string[] // * We will check its type and render accordingly
}

const DefaultValue: React.FC<DefaultValueProps> = (props) => {
  const { defaultValue } = props

  if (Array.isArray(defaultValue) && defaultValue.length > 0) {
    const employeePictures = defaultValue
    return (
      <ul className='flex flex-row'>
        {employeePictures.map((pic, index) => (
          <li className='flex items-center justify-center px-1' key={index}>
            {pic !== null
              ? (
              <Image
                src={pic}
                alt={pic}
                width={25}
                height={25}
                className='rounded-full'
              />
                )
              : (
              <NoPicture width='25px' height='25px' />
                )}
          </li>
        ))}
      </ul>
    )
  } else if (typeof defaultValue === 'string') {
    return (
      <p
        className={`text-black dark:text-white ${
          props.disabled === true ? 'text-gray-400 cursor-not-allowed' : ''
        }`}
      >
        {defaultValue}
      </p>
    )
  }
}

export default DefaultValue
