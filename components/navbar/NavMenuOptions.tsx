import { DarkTheme } from '@/icons/DarkTheme'
import { Issue } from '@/icons/Issue'
import { LightTheme } from '@/icons/LightTheme'
import { Project } from '@/icons/Project'
import { Settings } from '@/icons/Settings'
import { Task } from '@/icons/Task'
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
          className='text-theming-dark100 dark:text-theming-white100 flex items-center gap-2 p-2 py-1 mx-4 rounded-md hover:bg-theming-white200 dark:hover:bg-theming-dark400'
          href='/projects'
        >
          <div className='rounded-full bg-azure-radiance-400 p-2'>
            <Project />
          </div>
          <p>Projects</p>
        </Link>
        <Link
          className='text-theming-dark100 dark:text-theming-white100 flex items-center gap-2 p-2 py-1 mx-4 rounded-md hover:bg-theming-white200 dark:hover:bg-theming-dark400'
          href='/tasks'
        >
          <div className='rounded-full bg-azure-radiance-400 p-2'>
            <Task />
          </div>
          <p>Tasks</p>
        </Link>
        <Link
          className='text-theming-dark100 dark:text-theming-white100 flex items-center gap-2 p-2 py-1 mx-4 rounded-md hover:bg-theming-white200 dark:hover:bg-theming-dark400'
          href='/issues'
        >
          <div className='rounded-full bg-azure-radiance-400 p-2'>
            <Issue />
          </div>
          <p>Issues</p>
        </Link>
      </div>
      <div>
        <Link
          className='text-theming-dark100 dark:text-theming-white100 flex items-center gap-2 p-2 py-1 mx-4 rounded-md hover:bg-theming-white200 dark:hover:bg-theming-dark400'
          href='/settings'
        >
          <div className='rounded-full bg-azure-radiance-400 p-2'>
            <Settings />
          </div>
          <p>Settings</p>
        </Link>
        <span
          onClick={() => {
            switchTheme()
          }}
          className='text-theming-dark100 dark:text-theming-white100 flex items-center gap-2 p-2 py-1 mx-4 rounded-md hover:bg-theming-white200 dark:hover:bg-theming-dark400 cursor-pointer select-none'
        >
          <div className='rounded-full bg-azure-radiance-400 p-2'>
            {theme === 'dark' ? <DarkTheme /> : <LightTheme />}
          </div>
          <p>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</p>
        </span>
      </div>
    </>
  )
}

export { NavMenuOptions }
