import RippleButton from '../ripplebutton/RippleButton'
import Link from 'next/link'
import Image from 'next/image'
import styles from './navbar.module.css'
import { type Employee } from '@/interfaces/employee'
import { navItems } from './SmallScreenNavLinks'
import useLogout from './logout'
import NoPicture from '../No profile picture/NoPicture'

interface SmallScreenNavbarProps {
  toggle: boolean
  employee: Employee
}

const SmallScreenNavbar = ({
  toggle,
  employee
}: SmallScreenNavbarProps): JSX.Element => {
  const { handleLogout } = useLogout()

  return (
    <section
      className={`${styles.overlay} ${toggle ? styles.fadeIn : styles.fadeOut}`}
    >
      {employee.employeeId !== 0
        ? (
        <section className={styles.useroverlay}>
          <section className={styles.usercontainer}>
            {employee.profilePicture !== null
              ? (
              <Image
                src={employee.profilePicture}
                alt={employee.username}
                width={50}
                height={50}
                style={{ borderRadius: '50%' }}
              />
                )
              : (
              <NoPicture
                width='50px'
                height='50px'
                questionMarkSize='1.75rem'
              />
                )}
            <section className={styles.userinfo}>
              <span>
                Welcome, <span>{employee.username}</span>
              </span>
              <Link href={`/profile/${employee.username}`}>Your profile</Link>
            </section>
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
        </section>
          )
        : (
        <section className={styles.useroverlay}>
          <section className={styles.usercontainer}>
            <span>You are not logged in.</span>
            <RippleButton
              text='Login'
              backgroundColor='var(--blue)'
              effectColor='#CAF0F8'
              textColor='white'
              href='/login'
            />
          </section>
        </section>
          )}
      <section className={styles.items}>{navItems}</section>
    </section>
  )
}

export default SmallScreenNavbar
