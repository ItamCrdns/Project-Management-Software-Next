import { DarkTheme } from '@/svg/DarkTheme'
import { Issue } from '@/svg/Issue'
import { LightTheme } from '@/svg/LightTheme'
import { Project } from '@/svg/Project'
import { Settings } from '@/svg/Settings'
import { Task } from '@/svg/Task'
import Link from 'next/link'

interface NavMenuOptionsProps {
  theme: string
  switchTheme: () => void
}

const NavMenuOptions = ({ theme, switchTheme }: NavMenuOptionsProps) => {
  return (
    <>
      <div className='select-none border-b-2 border-theming-white200 dark:border-theming-dark400 mb-4 pb-4'>
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
      <div>
        <Link
          className='text-theming-dark100 dark:text-theming-white100 flex gap-2 p-2 py-1 mx-4 rounded-md hover:bg-theming-white200 dark:hover:bg-theming-dark400'
          href='/settings'
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
      </div>
    </>
  )
}

export { NavMenuOptions }
