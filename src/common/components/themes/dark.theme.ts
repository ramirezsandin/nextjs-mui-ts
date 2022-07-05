import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import { baseTheme } from 'common/components/themes/base.theme'

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
