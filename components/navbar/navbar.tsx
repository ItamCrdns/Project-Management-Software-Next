'use client'
import { navLinks } from './navlkins'
import { useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { door } from './door'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import Button from '../button/button'

const Navbar: React.FC = () => {
  const { user } = useAuth()
  const [toggle, setToggle] = useState<boolean>(false)
  const [showOverlay, setShowOverlay] = useState<boolean>(false) // * Avoid animation on initial render
  const [popup, setPopup] = useState<boolean>(false)
  const [toggleDoor, setToggleDoor] = useState<boolean>(false)

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
          <p className={styles.logo}>
            <Link
              onClick={() => {
                setToggle(false)
              }}
              href="/"
            >
              ACME Corporation
            </Link>
          </p>
          <section className={styles.links}>{navItems}</section>
        </section>
        <section className={styles.user}>
          {user.username === '' && (
            <>
              <p>
                <Link href="/">Log in</Link>
              </p>
              <p>
                <Link href="/register">Sign up</Link>
              </p>
            </>
          )}
          {user.username !== '' && (
            <aside
              onMouseLeave={() => {
                setPopup(false)
              }}
              onMouseEnter={() => {
                setPopup(popup ?? true)
              }}
              className={styles.useraside}
            >
              <section
                className={
                  popup !== null ? styles.navuserfocused : styles.navuser
                }
              >
                {user?.profilePicture !== null
                  ? (
                  <Image
                    src={user.profilePicture}
                    alt={user.username}
                    width={50}
                    height={50}
                    style={{ borderRadius: '50%' }}
                  />
                    )
                  : (
                  <div className={styles.nouser}>?</div>
                    )}
              </section>
              <section
                className={popup !== null ? styles.userpopup : styles.hidden}
              >
                <section className={styles.popuptext}>
                  <span>
                    Welcome,{' '}
                    <span className={styles.uppercase}>{user.username}</span>
                  </span>
                  <span className={styles.openprofile}>
                    <Link href={`/profile/${user.username}`}>Your profile</Link>
                  </span>
                </section>
                <section
                  onMouseEnter={() => {
                    setToggleDoor(!toggleDoor)
                  }}
                  onMouseLeave={() => {
                    setToggleDoor(false)
                  }}
                  className={styles.logoutbtn}
                  onClick={handleLogout}
                >
                  <span>{door(toggleDoor)}</span>
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
                {user.profilePicture !== null
                  ? (
                  <Image
                    src={user.profilePicture}
                    alt={user.username}
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
                    Welcome,{' '}
                    <span className={styles.uppercase}>{user.username}</span>
                  </span>
                  <span className={styles.openprofile}>
                    <Link
                      onClick={() => {
                        setToggle(false)
                      }}
                      href={`/profile/${user.username}`}
                    >
                      Your profile
                    </Link>
                  </span>
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
