import { ReactElement } from 'react'
import { Typography } from '@mui/material'

import { NextPageWithLayout } from '@/pages/_app'
import ThemeSwitcherButton from '@/react/components/theme-switcher/ThemeSwitcherButton'
import SiteLayout from '@/react/components/layouts/SiteLayout'

const IndexPage: NextPageWithLayout = () => {
  return (
    <div>
      <Typography variant='h1'>Demo home</Typography>
      <ThemeSwitcherButton />
    </div>
  )
}
IndexPage.getLayout = (page: ReactElement) => (
  <SiteLayout>
    {page}
  </SiteLayout>
)
export default IndexPage
