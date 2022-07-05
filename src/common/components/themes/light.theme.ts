// External dependencies
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
<<<<<<< HEAD

// Private dependencies
import { baseTheme } from './base.theme'
=======
import { baseTheme } from 'common/components/themes/base.theme'
>>>>>>> baf0b28597c2d8138dc83d1fcb971c885091cba1

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
