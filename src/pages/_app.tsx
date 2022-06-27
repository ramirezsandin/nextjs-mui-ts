import { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import Head from 'next/head'
import { CssBaseline } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import { EmotionCache } from '@emotion/cache'

import createEmotionCache from '@/lib/material-ui'
import { ThemeProvider } from '@/themes/ThemeContext'
import { AlertProvider } from 'components/alerts/AlertContext'
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider>
        <AlertProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </AlertProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
