import { navLinks } from './navlkins'
import Link from 'next/link'

export const navItems = (
    <ul>
      {navLinks.map((link) => (
        <li key={link.key}>
          <Link href={link.href}>{link.key}</Link>
        </li>
      ))}
    </ul>
)
