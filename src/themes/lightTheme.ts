import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import { baseTheme } from '@/themes/baseTheme'

const lightTheme = responsiveFontSizes(
  createTheme(
    deepmerge(baseTheme, {
      palette: {
        mode: 'light',
      },
    })
  )
)

export default lightTheme
