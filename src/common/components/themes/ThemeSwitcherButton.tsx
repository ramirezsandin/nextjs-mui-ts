// External dependencies
import { DarkModeOutlined, LightModeRounded } from '@mui/icons-material'
import { IconButton, IconButtonProps, Tooltip } from '@mui/material'

// Private dependencies
import { useThemeContext } from './ThemeContext'

interface ThemeSwitcherButtonProps extends IconButtonProps {}
export const ThemeSwitcherButton = ({ ...rest }: ThemeSwitcherButtonProps) => {
  const { themeMode, toggleTheme } = useThemeContext()
  return (
    <Tooltip
      title={
        themeMode === 'light' ? `Switch to dark mode` : `Switch to light mode`
      }
    >
      <IconButton {...rest} onClick={toggleTheme}>
        {themeMode === 'light' ? <DarkModeOutlined /> : <LightModeRounded />}
      </IconButton>
    </Tooltip>
  )
}
