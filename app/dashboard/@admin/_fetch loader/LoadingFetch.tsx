import styles from './loading.module.css'
import loaderstyles from '@/components/ripplebutton/ripplebutton.module.css'

interface Props {
  entityName: string
}

const LoadingFetch: React.FC<Props> = (props) => {
  return (
    <div className={styles.loadingbannerwrapper}>
      <div className={styles.loadingbanner}>
        <span
          style={{ width: '25px', height: '25px' }}
          className={loaderstyles.loader}
        ></span>
        <p>Loading {props.entityName}...</p>
      </div>
    </div>
  )
}

export default LoadingFetch
