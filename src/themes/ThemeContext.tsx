import { createContext, ReactNode, useContext, useState } from 'react'
import { ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material'
import { serialize } from 'cookie'

import lightTheme from '@/themes/light'
import darkTheme from '@/themes/dark'
import { useBroadcastChannel } from 'hooks/useBroadcastChannel'

type ThemeMode = 'light' | 'dark'

const DEFAULT_MODE: ThemeMode = 'light'
const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const THEME_MODE_COOKIE_NAME = 'theme-mode'

interface ThemeContextType {
  themeMode: ThemeMode
  toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)
const useThemeContext = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: ReactNode
  initialValue?: string
}
const ThemeProvider = ({ children, initialValue }: ThemeProviderProps) => {
  const systemPrefersDark = useMediaQuery(DARK_SCHEME_QUERY)

  const initialThemeMode: ThemeMode =
    initialValue === 'dark'
      ? initialValue
      : systemPrefersDark
      ? 'dark'
      : DEFAULT_MODE

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
    // Update cookie.
    document.cookie = serialize(THEME_MODE_COOKIE_NAME, newThemeMode)
  }

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export { useThemeContext, ThemeProvider }
