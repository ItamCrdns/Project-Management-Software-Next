'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { useAuth } from '@/context/AuthContext'
import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import DropdownMenu from './Menu'
import SmallScreenNavbar from './SmallScreenNavbar'
import { navItems } from './SmallScreenNavLinks'

const Navbar: React.FC = () => {
  const { user } = useAuth()
  const [toggle, setToggle] = useState<boolean>(false)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const employee = user as Employee

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

  return (
    <>
      <nav className={styles.navbar}>
        <section className={styles.navlinks}>
          <Link style={{ fontWeight: 700 }} href="/">ACME Corporation</Link>
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
              {showOptions && <DropdownMenu employee={employee} />}
            </>
          )}
        </section>
        <section onClick={handleOpenSmallDevicesMenu} className={styles.menu}>
          <span className={toggle ? styles.rotate : ''} />
          <span className={toggle ? styles.opacity0 : ''} />
          <span className={toggle ? styles.rotateminus : ''} />
        </section>
      </nav>
      {showOverlay && <SmallScreenNavbar toggle={toggle} employee={employee} />}
    </>
  )
}

export default Navbar
