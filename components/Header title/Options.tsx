import styles from '@/app/projects/(list)/userbanner.module.css'

interface OptionsProps {
  text: string
  toggle: boolean
  handleToggle: () => void
}

const Options: React.FC<OptionsProps> = (props) => {
  const { toggle, handleToggle } = props
  return (
    <div className={styles.options}>
      <p
        onClick={handleToggle}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        {props.text}
      </p>
      <span
        onClick={handleToggle}
        style={{
          fontSize: '1.5rem',
          cursor: 'pointer',
          userSelect: 'none'
        }}
        className="material-symbols-outlined"
      >
        {!toggle ? 'filter_list' : 'filter_list_off'}
      </span>
    </div>
  )
}

export default Options
