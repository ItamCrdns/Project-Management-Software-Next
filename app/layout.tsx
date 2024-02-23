import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { DarkModeProvider } from '@/context/DarkModeContext'
import Navbar from '@/components/navbar/navbar'
import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ProjectXHub',
  description: 'Created by Martin Cardenas'
}

// TODO: DARK MODE USING TAILWIND

const RootLayout = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <DarkModeProvider>
          <AuthProvider>
            <Navbar />
            <StoreProvider>{children}</StoreProvider>
          </AuthProvider>
        </DarkModeProvider>
      </body>
    </html>
  )
}

export default RootLayout
