import { navLinks } from './navlkins'
import Link from 'next/link'

export const navItems = (
  <ul className='flex flex-row space-x-4'>
    {navLinks.map((link) => (
      <li key={link.key}>
        <Link
          className='text-theming-dark100 dark:text-theming-white100'
          href={link.href}
        >
          {link.key}
        </Link>
      </li>
    ))}
  </ul>
)
