import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { cn } from 'src/utilities/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import React from 'react'
import { Toaster } from 'sonner'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import 'payloadcms-lexical-ext/client/client.css'
import '@radix-ui/themes/styles.css'
import './globals.css'

import { getServerSideURL } from '@/utilities/getURL'

const lufga = localFont({
  src: [
    {
      path: '../../../public/lufga/LufgaThin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../public/lufga/LufgaThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../../public/lufga/LufgaExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../public/lufga/LufgaExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../../public/lufga/LufgaLight.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/lufga/LufgaLightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../../public/lufga/LufgaRegular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/lufga/LufgaItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../public/lufga/LufgaMedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/lufga/LufgaMediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../../public/lufga/LufgaSemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/lufga/LufgaSemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../../public/lufga/LufgaBold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/lufga/LufgaBoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../../public/lufga/LufgaExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../public/lufga/LufgaExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../../public/lufga/LufgaBlack.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../../public/lufga/LufgaBlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-lufga',
})
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  return (
    <html
      className={cn(
        lufga.variable,
        GeistSans.variable,
        GeistMono.variable,
      )}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Jost:wght@100..900&family=Ubuntu:wght@300;400;500;700&family=Urbanist:wght@400..900&display=swap"
          rel="stylesheet"
        />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <LivePreviewListener />

          <Header />
          {children}
          <Footer />
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
