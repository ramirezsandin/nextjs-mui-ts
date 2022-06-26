import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material'

import lightTheme from '@/themes/light'
import darkTheme from '@/themes/dark'
import useLocalStorage from '@/react/hooks/useLocalStorage'

type ThemeMode = 'light' | 'dark'

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const DEFAULT_MODE: ThemeMode = 'light'

interface ThemeContextType {
  themeMode: ThemeMode
  toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)
const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const prefersDark = useMediaQuery(DARK_SCHEME_QUERY)

  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>(
    'themeMode',
    prefersDark ? 'dark' : DEFAULT_MODE
  )

  const toggleTheme = () => {
    switch (themeMode) {
      case 'light':
        setThemeMode('dark')
        break
      case 'dark':
        setThemeMode('light')
        break
      default:
    }
  }
  if (!mounted) {
    return children
  }
  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export { useThemeContext, ThemeProvider }
