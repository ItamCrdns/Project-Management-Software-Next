'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DropdownMenu from './Menu'
import SmallScreenNavbar from './SmallScreenNavbar'
import { navItems } from './SmallScreenNavLinks'
import NoPicture from '../No profile picture/NoPicture'
import { usePathname, useRouter } from 'next/navigation'
import { type Employee } from '@/interfaces/employee'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'

const Navbar: React.FC<{
  currentTheme: string
  user: Employee | null
  statusCodeFromBackend: number
}> = (props) => {
  const { user, statusCodeFromBackend } = props
  const [toggle, setToggle] = useState<boolean>(false)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const router = useRouter()
  const { setAlert } = useAlertActions()

  const handleOpenSmallDevicesMenu = (): void => {
    setToggle(!toggle)

    if (toggle) {
      setTimeout(() => {
        setShowOverlay(false)
      }, 250)
    } else {
      setShowOverlay(true)
    }
  }

  const [theme, setTheme] = useState<string>(props.currentTheme)

  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/login' && statusCodeFromBackend !== 200) {
      setAlert({
        message: 'You must be logged in to access this page',
        type: 'error'
      })
      router.push('/login')
    }

    // * Listen for route changes and close the menu when the route changes
    setShowOptions(false)
  }, [pathname])

  return (
    <>
      <nav className='relative py-0 pl-4 flex items-center justify-between shadow-md z-[9999] h-20 bg-theming-white100 dark:bg-theming-dark300'>
        <div className='flex items-center justify-center'>
          <Link
            className='font-bold text-theming-dark100 dark:text-theming-white100'
            href='/'
          >
            ACME Corporation
          </Link>
          <div className='px-4 py-0'>{navItems}</div>
        </div>
        <div className='hidden lg:block'>
          {user !== null && (
            <>
              <div className='flex items-center gap-8 px-4 py-0'>
                {user.profilePicture !== '' && user.profilePicture !== null ? (
                  <Image
                    onClick={() => {
                      setShowOptions(!showOptions)
                    }}
                    src={user.profilePicture}
                    alt={user.username}
                    width={50}
                    height={50}
                    className='rounded-full cursor-pointer'
                  />
                ) : (
                  <div
                    onClick={() => {
                      setShowOptions(!showOptions)
                    }}
                    className='cursor-pointer'
                  >
                    <NoPicture
                      width='50px'
                      height='50px'
                      questionMarkSize='1.75rem'
                    />
                  </div>
                )}
              </div>
              {showOptions && (
                <DropdownMenu
                  employee={user}
                  theme={theme}
                  switchTheme={() => {
                    setTheme(theme === 'light' ? 'dark' : 'light')
                  }}
                  closeDropdownMenu={() => {
                    setShowOptions(false)
                  }}
                />
              )}
            </>
          )}
        </div>
        <div
          onClick={handleOpenSmallDevicesMenu}
          className='lg:hidden flex flex-col items-center justify-center w-14 gap-3 pr-4 border-0 cursor-pointer'
        >
          <span
            className={`h-2px w-full bg-black dark:bg-white transition-all duration-200 origin-left ${
              toggle ? 'transform rotate-45' : ''
            }`}
          />
          <span
            className={`h-2px w-full bg-black dark:bg-white transition-all duration-200 origin-left ${
              toggle ? 'opacity-0 h-1' : ''
            }`}
          />
          <span
            className={`h-2px w-full bg-black dark:bg-white transition-all duration-200 origin-left ${
              toggle ? 'transform -rotate-45' : ''
            }`}
          />
        </div>
      </nav>
      {showOverlay && user !== null && (
        <SmallScreenNavbar showOverlay={toggle} employee={user} />
      )}
    </>
  )
}

export default Navbar
