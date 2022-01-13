import { FC } from 'react'
import Link from 'next/link'
import { AppBar, Container, IconButton, Toolbar } from '@mui/material'
import { Home } from '@mui/icons-material'

import ThemeSwitcherButton from '@/react/components/theme-switcher/ThemeSwitcherButton'
import AlertContainer from '@/react/components/alerts/AlertContainer'

const SiteLayout: FC = ({ children }) => {
    return (
        <>
            <AppBar position='static'>
                <Toolbar
                    sx={{
                        justifyContent: 'space-between'
                    }}
                >
                    <Link href='/' passHref>
                        <IconButton color='inherit'>
                            <Home />
                        </IconButton>
                    </Link>
                    <ThemeSwitcherButton color='inherit' />
                </Toolbar>
            </AppBar>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
                }}
            >
                {children}
            </Container>
            <Container component='footer'>

            </Container>
            <AlertContainer />
        </>
    )
}

export default SiteLayout