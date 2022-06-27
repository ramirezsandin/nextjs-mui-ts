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
import { useBroadcastChannel } from 'hooks/useBroadcastChannel'

type ThemeMode = 'light' | 'dark'

const DEFAULT_MODE: ThemeMode = 'light'
const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const THEME_MODE_VAR_NAME = 'themeMode'

interface ThemeContextType {
  themeMode: ThemeMode
  toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)
const useThemeContext = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: ReactNode
}
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemPrefersDark = useMediaQuery(DARK_SCHEME_QUERY)

  const initialThemeMode: ThemeMode = systemPrefersDark ? 'dark' : DEFAULT_MODE

  const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode)

  const { postMessage } = useBroadcastChannel<ThemeMode>(
    'theme-mode-updater',
    setThemeMode
  )

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
    // Update state.
    setThemeMode(newThemeMode)
    // Broadcast change to other tabs.
    postMessage(newThemeMode)
    // Update localStorage
    localStorage.setItem(THEME_MODE_VAR_NAME, newThemeMode)
  }

  useEffect(() => {
    const mode = localStorage.getItem(THEME_MODE_VAR_NAME)
    if (mode === 'dark' || mode === 'light') {
      setThemeMode(mode)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export { useThemeContext, ThemeProvider }
