import styles from './navbar.module.css'
import Image from 'next/image'
import Button from '../button/button'
import { type Employee } from '@/context/AuthContext'
import useLogout from './logout'
import Link from 'next/link'

interface DropdownMenuProps {
  employee: Employee
}

const DropdownMenu = ({ employee }: DropdownMenuProps): JSX.Element => {
  const { handleLogout } = useLogout()

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
          <span className="material-symbols-outlined">tactic</span>
          <p>Projects</p>
        </span>
        <span>
          <span className="material-symbols-outlined">auto_stories</span>
          <p>Tasks</p>
        </span>
        <span>
          <span className="material-symbols-outlined">data_alert</span>
          <p>Issues</p>
        </span>
      </section>
      <section className={styles.popupmenusettings}>
        <span>
          <span className="material-symbols-outlined">settings</span>
          <p>Settings</p>
        </span>
        <span>
          <span className="material-symbols-outlined">dark_mode</span>
          <p>Dark mode</p>
        </span>
      </section>
      <section onClick={handleLogout} className={styles.logout}>
        <Button
          text={
            <span style={{ fontSize: '14px' }}>
              <span
                style={{ margin: '-2.25rem' }}
                className="material-symbols-outlined"
              >
                logout
              </span>
              Logout
            </span>
          }
          backgroundColor="rgb(255, 80, 120)"
          effectColor="rgb(255, 50, 120)"
          textColor="white"
        />
      </section>
    </aside>
  )
}

export default DropdownMenu
