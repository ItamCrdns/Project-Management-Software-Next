import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StoreProvider from './StoreProvider'
import { cookies } from 'next/headers'
import { NavbarWrapper } from '@/components/navbar/NavbarWrapper'
import Alert from '@/components/Alert/Alert'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Project Management Software',
  description: 'Created by Martin Cardenas'
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cookie = cookies().get('theme')?.value

  return (
    <html lang='en' className={cookie ?? 'light'}>
      <body
        className={`bg-theming-white200 dark:bg-theming-dark200 ${inter.className}`}
      >
        <div className='dark:text-white'>
          <StoreProvider>
            <NavbarWrapper currentTheme={cookie ?? 'light'} />
            <Alert />
            {children}
          </StoreProvider>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
