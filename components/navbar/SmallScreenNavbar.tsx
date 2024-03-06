import { Button } from '../Button/Button'
import Link from 'next/link'
import Image from 'next/image'
import { type Employee } from '@/interfaces/employee'
import { navItems } from './SmallScreenNavLinks'
import NoPicture from '../No profile picture/NoPicture'
import { logout } from './actions/logout'

interface SmallScreenNavbarProps {
  showOverlay: boolean
  employee: Employee
}

const SmallScreenNavbar: React.FC<SmallScreenNavbarProps> = (props) => {
  const { showOverlay, employee } = props

  return (
    <section
      className={`absolute w-full z-10 ${
        showOverlay ? 'animate-slide-in' : 'animate-slide-out'
      }`}
    >
      {employee.employeeId !== 0
        ? (
        <div className='flex flex-col items-center justify-center gap-4 px-0 py-4 bg-theming-white100 dark:bg-theming-dark200'>
          <div className='flex items-center gap-4'>
            {employee.profilePicture !== null
              ? (
              <Image
                src={employee.profilePicture}
                alt={employee.username}
                width={50}
                height={50}
                className='rounded-full'
              />
                )
              : (
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
                href={`/profile/${employee.username}`}
              >
                Your profile
              </Link>
            </div>
            <Button text='Logout' func={() => {
              void (async () => {
                await logout()
              })()
            }} />
          </div>
        </div>
          )
        : (
        <div className='flex flex-col items-center justify-center gap-4 px-0 py-4 bg-theming-white100 dark:bg-theming-dark100'>
          <div className='flex items-center gap-4'>
            <span>You are not logged in.</span>
            <Button text='Login' href='/login' />
          </div>
        </div>
          )}
      <div className='flex flex-col items-center'>{navItems}</div>
    </section>
  )
}

export default SmallScreenNavbar
