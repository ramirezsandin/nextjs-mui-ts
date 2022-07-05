import { ReactNode } from 'react'
import Link from 'next/link'
import { AppBar, Container, IconButton, Toolbar } from '@mui/material'
import { Home } from '@mui/icons-material'

interface SiteLayoutProps {
  children?: ReactNode
}
const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" passHref>
            <IconButton color="inherit">
              <Home />
            </IconButton>
          </Link>
          <ThemeSwitcherButton color="inherit" />
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
      <Container component="footer"></Container>
      <AlertContainer />
    </>
  )
}

export default SiteLayout
