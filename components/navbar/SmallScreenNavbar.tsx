import RippleButton from '../ripplebutton/RippleButton'
import Link from 'next/link'
import Image from 'next/image'
import { type Employee } from '@/interfaces/employee'
import { navItems } from './SmallScreenNavLinks'
import useLogout from './logout'
import NoPicture from '../No profile picture/NoPicture'

interface SmallScreenNavbarProps {
  showOverlay: boolean
  employee: Employee
}

const SmallScreenNavbar: React.FC<SmallScreenNavbarProps> = (props) => {
  const { showOverlay, employee } = props

  const { handleLogout } = useLogout()

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
            <RippleButton
              text='Logout'
              icon='logout'
              iconSize='20px'
              backgroundColor='rgb(255, 80, 120)'
              effectColor='rgb(255, 50, 120)'
              textColor='white'
              func={handleLogout}
            />
          </div>
        </div>
          )
        : (
        <div className='flex flex-col items-center justify-center gap-4 px-0 py-4 bg-theming-white100 dark:bg-theming-dark100'>
          <div className='flex items-center gap-4'>
            <span>You are not logged in.</span>
            <RippleButton
              text='Login'
              backgroundColor='var(--blue)'
              effectColor='#CAF0F8'
              textColor='white'
              href='/login'
            />
          </div>
        </div>
          )}
      <div className='flex flex-col items-center'>{navItems}</div>
    </section>
  )
}

export default SmallScreenNavbar
