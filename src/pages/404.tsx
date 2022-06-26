import { ReactElement } from 'react'
import Head from 'next/head'
import { Box, Typography } from '@mui/material'

import SiteLayout from 'components/layouts/SiteLayout'

const NotFound = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Head>
        <title>{`404: Not Found | ${
          process.env.NEXT_PUBLIC_SITE_NAME ?? `Site with no name`
        }`}</title>
      </Head>
      <Typography variant="h1">{`404: Not found`}</Typography>
      <Typography paragraph>
        {`The page you're trying to reach does not exist.`}
      </Typography>
    </Box>
  )
}
NotFound.getLayout = (page: ReactElement) => <SiteLayout>{page}</SiteLayout>
export default NotFound
