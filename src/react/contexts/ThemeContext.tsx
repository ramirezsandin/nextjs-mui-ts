import { createContext, ReactNode, useContext } from 'react'
import { ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material'

import lightTheme from '@/themes/light'
import darkTheme from '@/themes/dark'
import useLocalStorage from '@/react/hooks/useLocalStorage'

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)'

type ThemeMode = 'light' | 'dark'
interface ThemeContextType {
    themeMode: ThemeMode
    toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)
const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const isDarkOS = useMediaQuery(DARK_SCHEME_QUERY)

    const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>('themeMode', isDarkOS ? 'light' : 'dark')

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

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <MuiThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export {
    useThemeContext,
    ThemeProvider
}