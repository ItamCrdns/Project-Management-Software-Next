import stylesloader from '@/components/ripplebutton/ripplebutton.module.css'
import styles from './dashboard.module.css'

const Loading: React.FunctionComponent = () => {
  return (
    <div className={styles.bannerwrapper} style={{ minWidth: '400px' }}>
      <span>
        <div className={stylesloader.loaderwrapper}>
          <span
            style={{
              borderTop: '2px solid rgba(0, 0, 0, 0.5)',
              width: '25px',
              height: '25px'
            }}
            className={stylesloader.loader}
          ></span>
        </div>
        <h1>Loading. Please wait...</h1>
      </span>
    </div>
  )
}

export default Loading
