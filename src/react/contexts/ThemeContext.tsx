import { createContext, ReactNode, useContext, useState } from 'react'
import { Theme, ThemeProvider as MuiThemeProvider } from '@mui/material'

import lightTheme from '@/themes/light'
import darkTheme from '@/themes/dark'

interface ThemeContextType {
    currentTheme: Theme
    toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)
const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme)
    const toggleTheme = () => {
        switch (currentTheme.palette.mode) {
            case 'light':
                setCurrentTheme(darkTheme)
                break
            case 'dark':
                setCurrentTheme(lightTheme)
                break
            default:
        }
    }
    return (
        <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
            <MuiThemeProvider theme={currentTheme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export {
    useThemeContext,
    ThemeProvider
}