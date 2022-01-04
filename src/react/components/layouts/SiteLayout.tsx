import { FC } from 'react'
import { AppBar, Toolbar } from '@mui/material'

const SiteLayout: FC = ({ children }) => {
    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    Menu
                </Toolbar>
            </AppBar>
            {children}
            <footer>

            </footer>
        </>
    )
}

export default SiteLayout