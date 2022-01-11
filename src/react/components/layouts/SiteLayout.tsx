import { FC } from 'react'
import { AppBar, Container, Toolbar } from '@mui/material'

const SiteLayout: FC = ({ children }) => {
    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    Menu
                </Toolbar>
            </AppBar>
            <Container>
                {children}
            </Container>
            <Container component='footer'>

            </Container>
        </>
    )
}

export default SiteLayout