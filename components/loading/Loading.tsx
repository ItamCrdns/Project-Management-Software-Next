import styles from '@/components/ripplebutton/ripplebutton.module.css' // * Here we have the loader styles

interface LoadingProps {
  entityName: string
}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <div
      className='flex items-center justify-center w-12 h-12'
      style={{ display: 'flex', gap: '1rem', width: 'auto', height: 'auto' }}
    >
      <span
        style={{
          borderTop: '2px solid var(--text-color)'
        }}
        className={styles.loader}
      ></span>
      <p>Loading {props.entityName}...</p>
    </div>
  )
}

export default Loading
