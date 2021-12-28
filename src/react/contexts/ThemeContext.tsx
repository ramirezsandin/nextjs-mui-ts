import { createContext, ReactNode, useContext, useState } from 'react'
import { Theme, ThemeProvider as MuiThemeProvider } from '@mui/material'

import lightTheme from '@/themes/light'
import darkTheme from '@/themes/dark'

interface ThemeContextType {
    setDarkTheme: () => void
    setLightTheme: () => void
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)
const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme)
    const setLightTheme = () => {
        setCurrentTheme(lightTheme)
    }
    const setDarkTheme = () => {
        setCurrentTheme(darkTheme)
        lightTheme
    }
    return (
        <ThemeContext.Provider value={{ setLightTheme, setDarkTheme }}>
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