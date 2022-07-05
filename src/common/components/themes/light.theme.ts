// External dependencies
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'

// Private dependencies
import { baseTheme } from './base.theme'

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
