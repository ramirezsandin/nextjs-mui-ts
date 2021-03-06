// External dependencies
import { ReactElement } from 'react'
import { Stack, Typography } from '@mui/material'

// Shared dependencies
import { AlertSender, SiteLayout } from '@/common/components'

const IndexPage = () => {
  return (
    <Stack py={2} spacing={2}>
      <Typography variant="h1" textAlign="center">
        Next.js + Material UI + Typescript example
      </Typography>

      <Typography variant="h2">Introduction</Typography>
      <Typography paragraph>
        This example consist of a starting point to a project to use Next.js,
        Material UI, and Typescript.
      </Typography>
      <Typography variant="h2">Features</Typography>
      <ul>
        <li>Static Layout</li>
        <li>Custom 404 page</li>
        <li>Theme Switcher functionality (Light and Dark)</li>
        <li>Persistence of the theme selection on local storage</li>
        <li>Global alert system with Mui Snackbar</li>
      </ul>
      <Typography variant="h2">Alert Demo</Typography>
      <AlertSender />
    </Stack>
  )
}
IndexPage.getLayout = (page: ReactElement) => <SiteLayout>{page}</SiteLayout>
export default IndexPage

export function getStaticProps() {
  return { props: {} }
}
