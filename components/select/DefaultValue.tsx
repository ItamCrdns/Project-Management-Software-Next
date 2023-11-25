import Image from 'next/image'
import styles from './select.module.css'

interface DefaultValueProps {
  defaultValue: string | string[] // * We will check its type and render accordingly
  defaultText: string
}

const DefaultValue: React.FC<DefaultValueProps> = (props) => {
  const { defaultValue, defaultText } = props

  if (typeof defaultValue === 'object') {
    const employeePictures = defaultValue
    return (
      <div className={styles.defaultimageswrapper}>
        <ul>
          {Array.isArray(employeePictures)
            ? (
            <>
              {employeePictures.map((pic, index) => (
                <li key={index}>
                  <Image src={pic} alt={defaultText} width={25} height={25} />
                </li>
              ))}
            </>
              )
            : (
            <p>No employees selected.</p>
              )}
        </ul>
      </div>
    )
  }

  if (typeof defaultValue === 'string') {
    // TODO: Handle string default values
    return <>Text def value</>
  }
}

export default DefaultValue
