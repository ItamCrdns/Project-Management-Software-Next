import Image from 'next/image'
import styles from './select.module.css'
import NoPicture from '../No profile picture/NoPicture'

interface DefaultValueProps {
  defaultValue: string | string[] | undefined // * We will check its type and render accordingly
}

const DefaultValue: React.FC<DefaultValueProps> = (props) => {
  const { defaultValue } = props

  if (Array.isArray(defaultValue) && defaultValue.length > 0) {
    const employeePictures = defaultValue
    return (
      <div className={styles.defaultimageswrapper}>
        <ul>
          {employeePictures.map((pic, index) => (
            <li key={index}>
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
      </div>
    )
  } else if (typeof defaultValue === 'string') {
    return defaultValue
  }
}

export default DefaultValue
