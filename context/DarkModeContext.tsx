'use client'
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'

interface DarkModeContextType {
  darkMode: boolean
  darkModeButtonPressed: boolean
  toggleDarkMode: () => void
}

const initialState: DarkModeContextType = {
  darkMode: false,
  darkModeButtonPressed: false,
  toggleDarkMode: () => {}
}

const DarkModeContext = createContext<DarkModeContextType>(initialState)

/**
 * Provides a context for managing dark mode state and toggling it.
 */
export const DarkModeProvider = ({
  children
}: PropsWithChildren): JSX.Element => {
  const [darkMode, setDarkMode] = useState<boolean>(initialState.darkMode)
  const [darkModeButtonPressed, setDarkModeButtonPressed] = useState<boolean>(initialState.darkModeButtonPressed)

  /**
   * Updates the CSS variables and saves the dark mode state to local storage.
   */
  useEffect(() => {
    // Direct dom manipulation ca be potentially improved
    const root = document.documentElement
    root.style.setProperty('--background-color', darkMode ? '#121212' : 'rgb(245, 245, 245)')
    root.style.setProperty('--banner-color', darkMode ? '#1E1E1E' : 'white')
    root.style.setProperty('--text-color', darkMode ? 'white' : 'black')
    root.style.setProperty('--small-font', darkMode ? 'rgba(255, 255, 255, .5)' : 'rgba(0, 0, 0, .5)')
    root.style.setProperty('--darker-banner-color', darkMode ? '#1A1A1A' : 'whitesmoke')

    if (!darkModeButtonPressed) {
      // Get the data from localstorage if the darkMode button was not pressed, so meaning the initial render when its still false
      setDarkMode(JSON.parse(localStorage.getItem('darkMode') as string))
    }

    if (darkModeButtonPressed) {
      // Save the data to localstorage if the darkMode button was pressed
      localStorage.setItem('darkMode', JSON.stringify(darkMode))
      console.log('saved')
    }
  }, [darkMode])

  /**
   * Toggles the dark mode state and sets the button pressed state to true.
   */
  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode)
    setDarkModeButtonPressed(true)
  }

  return (
    <DarkModeContext.Provider value={{ toggleDarkMode, darkMode, darkModeButtonPressed }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext)
  if (context === null) {
    return initialState
  }
  return context
}
