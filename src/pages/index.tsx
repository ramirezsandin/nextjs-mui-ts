// External dependencies
import { ReactElement } from 'react'
import { Stack, Typography } from '@mui/material'

<<<<<<< HEAD
// Shared dependencies
import { AlertSender, SiteLayout } from '@/common/components'
=======
import SiteLayout from 'common/components/layouts/site-layout/SiteLayout'
import AlertSender from 'common/components/alerts/AlertSender'
>>>>>>> baf0b28597c2d8138dc83d1fcb971c885091cba1

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
