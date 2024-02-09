import styles from './navbar.module.css'
import Image from 'next/image'
import RippleButton from '../ripplebutton/RippleButton'
import { type Employee } from '@/interfaces/employee'
import useLogout from './logout'
import Link from 'next/link'
import { useDarkMode } from '@/context/DarkModeContext'
import { useEffect, useRef } from 'react'

interface DropdownMenuProps {
  employee: Employee
  closeDropdownMenu: () => void
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  employee,
  closeDropdownMenu
}): JSX.Element => {
  const { handleLogout } = useLogout()
  const { toggleDarkMode, darkMode } = useDarkMode()

  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      if (ref.current !== null && !ref.current.contains(event.target as Node)) {
        closeDropdownMenu()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref])

  return (
    <aside className={styles.userpopup} ref={ref}>
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
        <Link href='/projects'>
          <span className='material-symbols-outlined'>emoji_objects</span>
          <p>Projects</p>
        </Link>
        <Link href='/tasks'>
          <span className='material-symbols-outlined'>note_stack</span>
          <p>Tasks</p>
        </Link>
        <Link href='/issues'>
          <span className='material-symbols-outlined'>campaign</span>
          <p>Issues</p>
        </Link>
      </section>
      <section className={styles.popupmenusettings}>
        <Link href=''>
          <span className='material-symbols-outlined'>settings</span>
          <p>Settings</p>
        </Link>
        <span onClick={toggleDarkMode}>
          <span className='material-symbols-outlined'>
            {!darkMode ? 'dark_mode' : 'light_mode'}
          </span>
          <p>{!darkMode ? 'Dark mode' : 'Light mode'}</p>
        </span>
      </section>
      <section className={styles.logout}>
        <RippleButton
          text='Logout'
          icon='logout'
          iconSize='20px'
          backgroundColor='rgb(255, 80, 120)'
          effectColor='rgb(255, 50, 120)'
          textColor='white'
          func={handleLogout}
        />
      </section>
    </aside>
  )
}

export default DropdownMenu
