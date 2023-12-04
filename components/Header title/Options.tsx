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
      <p onClick={handleToggle}>{props.text}</p>
      <span onClick={handleToggle} className='material-symbols-outlined'>
        {!toggle ? 'expand_more' : 'expand_less'}
      </span>
    </div>
  )
}

export default Options
