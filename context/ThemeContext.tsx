'use client'
import { createContext, useContext, useEffect, useState } from 'react'

interface DarkModeContextType {
  theme: string
  toggleTheme: () => void
}

const ThemeContext = createContext<DarkModeContextType | null>(null)

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const localTheme = window.localStorage.getItem('theme')
      return localTheme ?? 'light'
    } else {
      return 'light'
    }
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      window.localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      window.localStorage.setItem('theme', 'light')
    }
  }, [theme])

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): DarkModeContextType => {
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
