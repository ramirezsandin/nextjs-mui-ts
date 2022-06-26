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
  const prefersDark = useMediaQuery(DARK_SCHEME_QUERY)

  const [themeMode, setThemeMode] = useState<ThemeMode>(
    prefersDark ? 'dark' : DEFAULT_MODE
  )

  useEffect(() => {
    const mode = localStorage.getItem('themeMode')
    if (mode !== null && (mode === 'light' || mode === 'dark')) {
      setThemeMode(mode)
    }
  }, [])

  const toggleTheme = () => {
    let newThemeMode: ThemeMode = DEFAULT_MODE
    switch (themeMode) {
      case 'light':
        newThemeMode = 'dark'
        break
      case 'dark':
        newThemeMode = 'light'
        break
      default:
    }
    setThemeMode(newThemeMode)
    localStorage.setItem('themeMode', newThemeMode)
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
