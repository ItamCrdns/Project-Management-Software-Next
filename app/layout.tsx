import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/navbar/navbar'
import StoreProvider from './StoreProvider'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ProjectXHub',
  description: 'Created by Martin Cardenas'
}

const RootLayout = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <html lang='en'>
      <body className={`bg-theming-white200 dark:bg-theming-dark200 ${inter.className}`}>
        <div className='dark:text-white'>
          <ThemeProvider>
            <AuthProvider>
              <Navbar />
              <StoreProvider>{children}</StoreProvider>
            </AuthProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
