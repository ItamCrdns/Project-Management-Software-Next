import { useEffect, useState } from 'react'

export const useTheme = (currentTheme: string) => {
  const [theme, setTheme] = useState<string>(currentTheme || 'light')

  const handleThemeSwitch = (): void => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    const themes = ['dark', 'light']
    themes.forEach((existingTheme) => {
      if (document.documentElement.classList.contains(existingTheme)) {
        document.documentElement.classList.remove(existingTheme)
      }
    })
    document.documentElement.classList.add(theme)
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getFullYear() + 10)
    const cookie = `theme=${theme}; expires=${expirationDate.toUTCString()}; path=/`
    document.cookie = cookie
  }, [theme])

  return { theme, handleThemeSwitch }
}
