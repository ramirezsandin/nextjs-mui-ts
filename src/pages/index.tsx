import { ReactElement } from 'react'
import { Box, Stack, Typography } from '@mui/material'

import { NextPageWithLayout } from '@/pages/_app'
import SiteLayout from '@/react/components/layouts/SiteLayout'

const IndexPage: NextPageWithLayout = () => {
  return (
    <Stack
      py={2}
      spacing={2}
    >
      <Typography variant='h1' textAlign='center'>
        Next.js + Material UI + Typescript example
      </Typography>

      <Typography variant='h2'>
        Introduction
      </Typography>
      <Typography paragraph>
        This example consist of a starting point to a project to use
        Next.js, Material UI, and Typescript.
      </Typography>
      <Typography variant='h2'>
        Features
      </Typography>
      <Typography paragraph>
        Static Layout, Theme Switcher functionality (Light and Dark), persistent state for the theme selection.
      </Typography>
    </Stack>
  )
}
IndexPage.getLayout = (page: ReactElement) => (
  <SiteLayout>
    {page}
  </SiteLayout>
)
export default IndexPage
