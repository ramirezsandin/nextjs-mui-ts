import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const darkTheme = responsiveFontSizes(createTheme({
    palette: {
        mode: 'dark',
    },
}))

export default darkTheme