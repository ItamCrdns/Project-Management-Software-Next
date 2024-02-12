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
import NoPicture from '../No profile picture/NoPicture'

// TODO: Fix when user has no profile picture

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

  const handleClickOutside = (): void => {
    setShowOptions(false)
  }

  return (
    <>
      <nav className={styles.navbar}>
        <section className={styles.navlinks}>
          <Link style={{ fontWeight: 700 }} href='/'>
            ACME Corporation
          </Link>
          <section className={styles.links}>{navItems}</section>
        </section>
        <section className={styles.user}>
          {user !== null && (
            <>
              <section className={styles.navuser}>
                {employee.profilePicture !== '' &&
                employee.profilePicture !== null
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
                  <div onClick={handleOpenMenu} style={{ cursor: 'pointer' }}>
                    <NoPicture
                      width='50px'
                      height='50px'
                      questionMarkSize='1.75rem'
                    />
                  </div>
                    )}
              </section>
              {showOptions && (
                <DropdownMenu
                  employee={employee}
                  closeDropdownMenu={handleClickOutside}
                />
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
      {showOverlay && <SmallScreenNavbar toggle={toggle} employee={employee} />}
    </>
  )
}

export default Navbar
