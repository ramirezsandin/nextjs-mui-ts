import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import { baseTheme } from '@/themes/baseTheme'

const darkTheme = responsiveFontSizes(
  createTheme(
    deepmerge(baseTheme, {
      palette: {
        mode: 'dark',
      },
    })
  )
)

export default darkTheme
