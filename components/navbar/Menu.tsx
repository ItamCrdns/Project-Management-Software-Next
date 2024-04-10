import Image from 'next/image'
import { Button } from '../Button/Button'
import { type Employee } from '@/interfaces/employee'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import NoPicture from '../No profile picture/NoPicture'
import { Project } from '../../svg/Project'
import { Task } from '../../svg/Task'
import { logout } from './actions/logout'
import { Issue } from '@/svg/Issue'
import { Settings } from '@/svg/Settings'
import { DarkTheme } from '@/svg/DarkTheme'
import { LightTheme } from '@/svg/LightTheme'
import { useOutsideClick } from '@/utility/closeOnOutsideClick'
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
      className='absolute z-999 top-24 right-3 shadow-md rounded-xl w-64 bg-theming-white100 dark:bg-theming-dark300'
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
          href={`/employee/${employee.username}`}
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
          <Issue />
          <p>Issues</p>
        </Link>
      </div>
      <section>
        <Link
          className='text-theming-dark100 dark:text-theming-white100 flex gap-2 p-2 py-1 mx-4 rounded-md hover:bg-theming-white200 dark:hover:bg-theming-dark400'
          href=''
        >
          <Settings />
          <p>Settings</p>
        </Link>
        <span
          onClick={() => {
            switchTheme()
          }}
          className='text-theming-dark100 dark:text-theming-white100 flex gap-2 p-2 py-1 mx-4 rounded-md hover:bg-theming-white200 dark:hover:bg-theming-dark400 cursor-pointer select-none'
        >
          {theme === 'dark' ? <DarkTheme /> : <LightTheme />}
          <p>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</p>
        </span>
      </section>
      <section className='flex items-center justify-center mx-0 my-4'>
        <Button
          text='Logout'
          func={() => {
            void (async () => {
              await logout()
            })()
          }}
        />
      </section>
    </aside>
  )
}

export default DropdownMenu
