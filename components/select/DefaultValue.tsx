import Image from 'next/image'
import styles from './select.module.css'
import NoPicture from '../No profile picture/NoPicture'

interface DefaultValueProps {
  defaultValue: string | string[] // * We will check its type and render accordingly
  defaultText: string
}

const DefaultValue: React.FC<DefaultValueProps> = (props) => {
  const { defaultValue, defaultText } = props

  const returnedText = defaultValue === '' ? defaultText : defaultValue

  if (typeof defaultValue === 'object') {
    const employeePictures = defaultValue
    return (
      <div className={styles.defaultimageswrapper}>
        <ul>
          {Array.isArray(employeePictures) && employeePictures.length > 0
            ? employeePictures.map((pic, index) => (
                <li key={index}>
                  {pic !== null
                    ? (
                    <Image src={pic} alt={defaultText} width={25} height={25} />
                      )
                    : (
                    <NoPicture width='25px' height='25px' />
                      )}
                </li>
            ))
            : defaultText}
        </ul>
      </div>
    )
  }

  if (typeof defaultValue === 'string' || typeof defaultValue === 'undefined') {
    // TODO: Handle string default values
    return returnedText
  }
}

export default DefaultValue
