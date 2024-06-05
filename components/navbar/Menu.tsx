import Image from 'next/image'
import { Button } from '../Button/Button'
import { type Employee } from '@/interfaces/employee'
import Link from 'next/link'
import { useRef } from 'react'
import NoPicture from '../No profile picture/NoPicture'
import { logout } from './actions/logout'
import { useOutsideClick } from '@/utility/closeOnOutsideClick'
import { NavMenuOptions } from './NavMenuOptions'
import { motion } from 'framer-motion'

interface DropdownMenuProps {
  employee: Employee
  closeDropdownMenu: () => void
  theme: string
  switchTheme: () => void
}

const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const { employee, closeDropdownMenu, theme, switchTheme } = props

  const ref = useRef<HTMLElement>(null)
  useOutsideClick({ ref, closeThis: closeDropdownMenu })

  return (
    <>
      <motion.aside
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className='absolute z-[9999] top-24 right-3 shadow-md rounded-xl w-64 bg-theming-white100 dark:bg-theming-dark300'
        ref={ref}
      >
        <section className='rounded-md m-4 px-4 py-0 flex flex-col justify-center bg-theming-white200 dark:bg-theming-dark400'>
          <section className='flex items-center gap-3 p-4 px-0 border-b-2 border-azure-radiance-500'>
            {employee.profilePicture !== null ? (
              <Image
                src={employee.profilePicture}
                alt={employee.username}
                width={50}
                height={50}
                className='rounded-full select-none'
              />
            ) : (
              <NoPicture
                width='50px'
                height='50px'
                questionMarkSize='1.75rem'
              />
            )}
            <p className='font-semibold'>{employee.username}</p>
          </section>
          <Link
            className='m-2 mx-0 text-theming-dark100 dark:text-theming-white100'
            href={`/employee/${employee.username}`}
          >
            Your profile
          </Link>
        </section>
        <NavMenuOptions theme={theme} switchTheme={switchTheme} />
        <div className='flex items-center justify-center mx-0 my-4'>
          <Button
            text='Logout'
            func={() => {
              ;(async () => {
                await logout()
              })()
            }}
          />
        </div>
      </motion.aside>
    </>
  )
}

export default DropdownMenu
