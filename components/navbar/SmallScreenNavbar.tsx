import { Button } from '../Button/Button'
import Link from 'next/link'
import Image from 'next/image'
import { type Employee } from '@/interfaces/employee'
import NoPicture from '../No profile picture/NoPicture'
import { logout } from './actions/logout'
import { NavMenuOptions } from './NavMenuOptions'
import { motion } from 'framer-motion'

interface SmallScreenNavbarProps {
  employee: Employee | null
  theme: string
  switchTheme: () => void
}

const SmallScreenNavbar: React.FC<SmallScreenNavbarProps> = (props) => {
  const { employee } = props

  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className='absolute w-full z-999'
    >
      {employee !== null ? (
        <div className='flex flex-col items-center justify-center gap-4 px-0 py-4 bg-theming-white100 dark:bg-theming-dark300 border-b-2 border-theming-white200 dark:border-theming-dark400'>
          <div className='flex items-center gap-4'>
            {employee.profilePicture !== null ? (
              <Image
                src={employee.profilePicture}
                alt={employee.username}
                width={50}
                height={50}
                className='rounded-full'
              />
            ) : (
              <NoPicture
                width='50px'
                height='50px'
                questionMarkSize='1.75rem'
              />
            )}
            <div className='flex flex-col'>
              <span>
                Welcome, <span>{employee.username}</span>
              </span>
              <Link
                className='font-bold text-theming-dark100 dark:text-theming-white100'
                href={`/employee/${employee.username}`}
              >
                Your profile
              </Link>
            </div>
            <Button
              text='Logout'
              func={() => {
                ;(async () => {
                  await logout()
                })()
              }}
            />
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center gap-4 px-0 py-4 bg-theming-white100 dark:bg-theming-dark300'>
          <div className='flex items-center gap-4'>
            <span>You are not logged in.</span>
            <Button text='Login' href='/login' />
          </div>
        </div>
      )}
      <div className='bg-theming-white100 dark:bg-theming-dark300 shadow-md pt-4 pb-4'>
        <NavMenuOptions theme={props.theme} switchTheme={props.switchTheme} />
        <p className='text-center text-xs text-gray-400 mt-4'>
          Made with love by Martin Cardenas
        </p>
      </div>
    </motion.section>
  )
}

export default SmallScreenNavbar
