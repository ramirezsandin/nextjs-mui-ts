import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const lightTheme = responsiveFontSizes(createTheme({
    palette: {
        mode: 'light',
    },
}))

export default lightTheme