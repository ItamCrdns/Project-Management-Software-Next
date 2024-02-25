import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/navbar/navbar'
import StoreProvider from './StoreProvider'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ProjectXHub',
  description: 'Created by Martin Cardenas'
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cookie = cookies().get('theme')?.value

  console.log('cookie', cookie)

  return (
    <html lang='en' className={cookie ?? 'light'}>
      <body
        className={`bg-theming-white200 dark:bg-theming-dark200 ${inter.className}`}
      >
        <div className='dark:text-white'>
          <AuthProvider>
            <Navbar currentTheme={cookie ?? 'light'} />
            <StoreProvider>{children}</StoreProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
