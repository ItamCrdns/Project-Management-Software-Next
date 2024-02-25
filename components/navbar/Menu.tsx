import Image from 'next/image'
import { Button } from '../Button/Button'
import { type Employee } from '@/interfaces/employee'
import useLogout from './logout'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import NoPicture from '../No profile picture/NoPicture'
import closeOnOutsideClick from '@/utility/closeOnOutsideClick'
import { Project } from '../Data Header/svg/Project'
import { Task } from '../Data Header/svg/Task'
interface DropdownMenuProps {
  employee: Employee
  closeDropdownMenu: () => void
  theme: string
  switchTheme: () => void
}

const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const { employee, closeDropdownMenu, theme, switchTheme } =
    props

  const { handleLogout } = useLogout()

  const ref = useRef<HTMLElement>(null)
  closeOnOutsideClick({ ref, closeThis: closeDropdownMenu })

  useEffect(() => {
    const themes = ['dark', 'light']

    themes.forEach((existingTheme) => {
      if (document.documentElement.classList.contains(existingTheme)) {
        document.documentElement.classList.remove(existingTheme)
      }
    })

    document.documentElement.classList.add(theme)

    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getFullYear() + 10)

    const cookie = `theme=${theme}; expires=${expirationDate.toUTCString()}; path=/`

    document.cookie = cookie
  }, [theme])

  return (
    <aside
      className='absolute z-50 top-24 right-3 shadow-md rounded-xl w-64 bg-theming-white100 dark:bg-theming-dark300'
      ref={ref}
    >
      <section className='rounded-md m-4 px-4 py-0 flex flex-col justify-center bg-theming-white200 dark:bg-theming-dark400'>
        <section className='flex items-center gap-3 p-4 px-0 border-b-2 border-azure-radiance-500'>
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
            <NoPicture width='50px' height='50px' questionMarkSize='1.75rem' />
              )}
          <p className='font-semibold'>{employee.username}</p>
        </section>
        <Link
          className='m-2 mx-0 text-theming-dark100 dark:text-theming-white100'
          href={`/employees/${employee.username}`}
        >
          Your profile
        </Link>
      </section>
      <div className='select-none border-b-2 border-theming-dark100 dark:border-theming-white200 mb-4 pb-4'>
        <Link
          className='text-theming-dark100 dark:text-theming-white100 flex gap-2 p-2 py-1 mx-4 rounded-md hover:bg-theming-white200 dark:hover:bg-theming-dark400'
          href='/projects'
        >
          <Project />
          <p>Projects</p>
        </Link>
        <Link
          className='text-theming-dark100 dark:text-theming-white100 flex gap-2 p-2 py-1 mx-4 rounded-md hover:bg-theming-white200 dark:hover:bg-theming-dark400'
          href='/tasks'
        >
          <Task />
          <p>Tasks</p>
        </Link>
        <Link
          className='text-theming-dark100 dark:text-theming-white100 flex gap-2 p-2 py-1 mx-4 rounded-md hover:bg-theming-white200 dark:hover:bg-theming-dark400'
          href='/issues'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46'
            />
          </svg>
          <p>Issues</p>
        </Link>
      </div>
      <section>
        <Link
          className='text-theming-dark100 dark:text-theming-white100 flex gap-2 p-2 py-1 mx-4 rounded-md hover:bg-theming-white200 dark:hover:bg-theming-dark400'
          href=''
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
            />
          </svg>
          <p>Settings</p>
        </Link>
        <span
          onClick={() => {
            switchTheme()
          }}
          className='text-theming-dark100 dark:text-theming-white100 flex gap-2 p-2 py-1 mx-4 rounded-md hover:bg-theming-white200 dark:hover:bg-theming-dark400 cursor-pointer select-none'
        >
          {theme === 'dark'
            ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
              />
            </svg>
              )
            : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
              />
            </svg>
              )}
          <p>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</p>
        </span>
      </section>
      <section className='flex items-center justify-center mx-0 my-4'>
        <Button text='Logout' func={handleLogout} />
      </section>
    </aside>
  )
}

export default DropdownMenu
