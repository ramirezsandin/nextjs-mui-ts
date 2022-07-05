// External dependencies
import { ReactNode } from 'react'
import Link from 'next/link'
import { AppBar, Container, IconButton, Toolbar } from '@mui/material'
import { Home } from '@mui/icons-material'

<<<<<<< HEAD
// Shared dependencies
import { ThemeSwitcherButton, AlertContainer } from '@/common/components'

=======
>>>>>>> baf0b28597c2d8138dc83d1fcb971c885091cba1
interface SiteLayoutProps {
  children?: ReactNode
}
export const SiteLayout = ({ children }: SiteLayoutProps) => {
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
