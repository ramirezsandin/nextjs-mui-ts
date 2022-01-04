import { useThemeContext } from '@/react/contexts/ThemeContext'
import { DarkMode, LightMode } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

const ThemeSwitcherButton = () => {
    const { currentTheme, toggleTheme } = useThemeContext()
    return (
        <Tooltip
            title={currentTheme.palette.mode === 'light' ? `Switch to dark mode` : `Switch to light mode`}
        >
            <IconButton
                onClick={toggleTheme}
            >
                {currentTheme.palette.mode === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>
        </Tooltip>
    )
}
export default ThemeSwitcherButton