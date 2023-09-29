import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Company PMO App',
  description: 'Created by Martin Cardenas'
}

const RootLayout = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
