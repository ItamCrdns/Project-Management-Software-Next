'use client'
import { navLinks } from './navlkins'
import { useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { door } from './door'
import { type Employee, useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import Button from '../button/button'

const Navbar: React.FC = () => {
  const { user } = useAuth()
  const [toggle, setToggle] = useState<boolean>(false)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)

  const employee = user as Employee

  const handleLogout = (): void => {
    window.localStorage.removeItem('user')
    window.location.reload()
  }

  const handleToggle = (): boolean => {
    setToggle(!toggle)

    if (toggle) {
      setTimeout(() => {
        setShowOverlay(false)
      }, 250)
    } else {
      setShowOverlay(true)
    }

    return toggle
  }

  const navItems = (
    <ul>
      {navLinks.map((link) => (
        <li key={link.key}>
          <Link href={link.href}>{link.key}</Link>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <nav className={styles.navbar}>
        <section className={styles.navlinks}>
          <Link href="/">ACME Corporation</Link>
          <section className={styles.links}>{navItems}</section>
        </section>
        <section className={styles.user}>
          {user === null && (
            <>
              <p>
                <Link href="/">Log in</Link>
              </p>
              <p>
                <Link href="/register">Sign up</Link>
              </p>
            </>
          )}
          {user !== null && (
            <aside className={styles.useraside}>
              <section className={styles.navuser}>
                {employee.profilePicture !== ''
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
                  <div className={styles.nouser}></div>
                    )}
              </section>
              <section className={styles.userpopup}>
                <section className={styles.popuptext}>
                  {employee.username !== ''
                    ? (
                    <>
                      <span>
                        <>
                          Welcome, <span>{employee.username}</span>
                        </>
                      </span>
                      <Link href={`/profile/${employee.username}`}>
                        Your profile
                      </Link>
                    </>
                      )
                    : (
                        ''
                      )}
                </section>
                <section className={styles.logoutbtn} onClick={handleLogout}>
                  <span>{door()}</span>
                </section>
              </section>
            </aside>
          )}
        </section>
        <section onClick={handleToggle} className={styles.menu}>
          <span className={toggle ? styles.rotate : ''} />
          <span className={toggle ? styles.opacity0 : ''} />
          <span className={toggle ? styles.rotateminus : ''} />
        </section>
      </nav>
      {showOverlay && (
        <section
          className={`${styles.overlay} ${
            toggle ? styles.fadeIn : styles.fadeOut
          }`}
        >
          {user == null && (
            <section className={styles.useroverlay}>
              <p>You are not logged in.</p>
              <div
                onClick={() => {
                  setToggle(false)
                }}
              >
                <Button text="Login" href="/" />
                <Button
                  text="Sign up"
                  backgroundColor="rgb(0, 210, 255)"
                  textColor="white"
                  href="/register"
                />
              </div>
            </section>
          )}
          {user !== null && (
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
                  <div className={styles.nouser}>?</div>
                    )}
                <section className={styles.userinfo}>
                  <span>
                    Welcome, <span>{employee.username}</span>
                  </span>
                  <Link
                    onClick={() => {
                      setToggle(false)
                    }}
                    href={`/profile/${employee.username}`}
                  >
                    Your profile
                  </Link>
                </section>
                <div onClick={handleLogout}>
                  <Button
                    text="Logout"
                    backgroundColor="red"
                    textColor="white"
                  />
                </div>
              </section>
            </section>
          )}
          <section className={styles.items}>{navItems}</section>
        </section>
      )}
    </>
  )
}

export default Navbar
