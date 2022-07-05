<<<<<<< HEAD
// External dependencies
=======
import { useThemeContext } from 'common/components/themes/ThemeContext'
>>>>>>> baf0b28597c2d8138dc83d1fcb971c885091cba1
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
