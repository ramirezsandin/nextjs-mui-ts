// External dependencies
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material'

// Shared dependencies
import { useBroadcastChannel } from '@/common/hooks'

// Private dependencies
import darkTheme from './dark.theme'
import lightTheme from './light.theme'

type ThemeMode = 'light' | 'dark'
const DEFAULT_THEME_MODE: ThemeMode = 'light'
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
  const [themeMode, setThemeMode] = useState<ThemeMode>(DEFAULT_THEME_MODE)

  const { postMessage } = useBroadcastChannel<ThemeMode>(
    'theme-mode-updater',
    setThemeMode
  )

  const toggleTheme = () => {
    const newThemeMode: ThemeMode = themeMode === 'light' ? 'dark' : 'light'
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
    } else {
      setThemeMode(systemPrefersDark ? 'dark' : DEFAULT_THEME_MODE)
    }
  }, [systemPrefersDark])

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export { useThemeContext, ThemeProvider }
