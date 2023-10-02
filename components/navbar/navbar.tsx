'use client'
import { navLinks } from './navlkins'
import { useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { type Employee, useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import Button from '../button/button'
import DropdownMenu from './Menu'

const Navbar: React.FC = () => {
  const { user } = useAuth()
  const [toggle, setToggle] = useState<boolean>(false)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const employee = user as Employee

  const handleLogout = (): void => {
    window.localStorage.removeItem('user')
    window.location.reload()
  }

  const handleOpenSmallDevicesMenu = (): boolean => {
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

  const handleOpenMenu = (): boolean => {
    setShowOptions(!showOptions)
    return showOptions
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
          {user !== null && (
            <>
              <section className={styles.navuser}>
                {employee.profilePicture !== ''
                  ? (
                  <Image
                    onClick={handleOpenMenu}
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
              {showOptions && (
                <DropdownMenu employee={employee} />
              )}
            </>
          )}
        </section>
        <section onClick={handleOpenSmallDevicesMenu} className={styles.menu}>
          <span className={toggle ? styles.rotate : ''} />
          <span className={toggle ? styles.opacity0 : ''} />
          <span className={toggle ? styles.rotateminus : ''} />
        </section>
      </nav>
      {/* small screen devices navbar */}
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
