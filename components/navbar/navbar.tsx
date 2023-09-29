'use client'
import { navLinks } from './navlkins'
import { useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false) // * Avoid animation on initial render
  const [popup, setPopup] = useState(false)
  const [toggleDoor, setToggleDoor] = useState(false)

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
            <Link onClick={() => { setToggle(false) }} href='/'>Readaddicts</Link>
          </p>
          <section className={styles.links}>{navItems}</section>
        </section>
        <section className={styles.user}>
          {!user && (
            <>
              <p>
                <Link href='/'>Log in</Link>
              </p>
              <p>
                <Link href='/register'>Sign up</Link>
              </p>
            </>
          )}
          {user && (
            <aside
              onMouseLeave={() => { setPopup(false) }}
              onMouseEnter={() => { setPopup(!popup) }}
              className={styles.useraside}
            >
              <section
                className={popup ? styles.navuserfocused : styles.navuser}
              >
                <Link href={`/profile/${user.username}/messages`} className='material-symbols-outlined'>
                  forum
                </Link>
                {user.profile_Picture
                  ? (
                    <Image
                      src={user.profile_Picture}
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
              <section className={popup ? styles.userpopup : styles.hidden}>
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
                  onMouseEnter={() => { setToggleDoor(!toggleDoor) }}
                  onMouseLeave={() => { setToggleDoor(false) }}
                  className={styles.logoutbtn}
                  onClick={handleLogout}
                >
                  <span>{door}</span>
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
          {!user && (
            <section className={styles.useroverlay}>
              <p>You are not logged in.</p>
              <div onClick={() => { setToggle(false) }}>
                <Button text='Login' href='/' />
                <Button
                  text='Sign up'
                  backgroundColor='rgb(0, 210, 255)'
                  textColor='white'
                  href='/register'
                />
              </div>
            </section>
          )}
          {user && (
            <section className={styles.useroverlay}>
              <section className={styles.usercontainer}>
                {user.profile_Picture
                  ? (
                    <Image
                      src={user.profile_Picture}
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
                    <Link onClick={() => { setToggle(false) }} href={`/profile/${user.username}`}>Your profile</Link>
                  </span>
                </section>
                <div onClick={handleLogout}>
                  <Button text='Logout' backgroundColor='red' textColor='white' />
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
