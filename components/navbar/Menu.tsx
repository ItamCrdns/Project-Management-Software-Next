import styles from './navbar.module.css'
import Image from 'next/image'
import RippleButton from '../ripplebutton/RippleButton'
import { type Employee } from '@/interfaces/employee'
import useLogout from './logout'
import Link from 'next/link'
import { useDarkMode } from '@/context/DarkModeContext'

interface DropdownMenuProps {
  employee: Employee
}

const DropdownMenu = ({ employee }: DropdownMenuProps): JSX.Element => {
  const { handleLogout } = useLogout()
  const { toggleDarkMode, darkMode } = useDarkMode()

  return (
    <aside className={styles.userpopup}>
      <section className={styles.userpopuser}>
        <section className={styles.userdatacontainer}>
          <Image
            src={employee.profilePicture}
            alt={employee.username}
            width={50}
            height={50}
            style={{ borderRadius: '50%' }}
          />
          <p>{employee.username}</p>
        </section>
        <p>
          <Link href={`/employees/${employee.username}`}>Your profile</Link>
        </p>
      </section>
      <section className={styles.popupmenu}>
        <span>
          <span className="material-symbols-outlined">emoji_objects</span>
          <p>Projects</p>
        </span>
        <span>
          <span className="material-symbols-outlined">note_stack</span>
          <p>Tasks</p>
        </span>
        <span>
          <span className="material-symbols-outlined">campaign</span>
          <p>Issues</p>
        </span>
      </section>
      <section className={styles.popupmenusettings}>
        <span>
          <span className="material-symbols-outlined">settings</span>
          <p>Settings</p>
        </span>
        <span onClick={toggleDarkMode}>
          <span className="material-symbols-outlined">
            {!darkMode ? 'dark_mode' : 'light_mode'}
          </span>
          <p>{!darkMode ? 'Dark mode' : 'Light mode'}</p>
        </span>
      </section>
      <section className={styles.logout}>
        <RippleButton
          text="Logout"
          icon="logout"
          iconSize="20px"
          backgroundColor="rgb(255, 80, 120)"
          effectColor="rgb(255, 50, 120)"
          textColor="white"
          func={handleLogout}
        />
      </section>
    </aside>
  )
}

export default DropdownMenu
