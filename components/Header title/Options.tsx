import styles from '@/app/projects/(list)/userbanner.module.css'
import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'

interface OptionsProps {
  text: string
  toggle: boolean
  handleToggle: () => void
  user: Employee | null
}

const Options: React.FC<OptionsProps> = (props) => {
  const { toggle, handleToggle, user } = props
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
      {user !== null && user.profilePicture !== '' && (
        <Image
          src={user.profilePicture}
          alt={user.username}
          width={35}
          height={35}
        />
      )}
    </div>
  )
}

export default Options
