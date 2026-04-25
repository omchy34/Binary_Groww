import type { Metadata, Viewport } from 'next'
import { Syne, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500'],
})

const BASE_URL = 'https://binary-groww.vercel.app'

export const viewport: Viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── Core ── */
  title: {
    default: 'binaryGroww — Web & App Development Agency',
    template: '%s | binaryGroww',
  },
  description:
    'binaryGroww is a full-stack digital agency based in Durgapur, India. We build sleek websites, powerful mobile apps, SaaS platforms, and e-commerce solutions that grow your business.',
  keywords: [
    'web development agency India',
    'mobile app development Durgapur',
    'SaaS development agency',
    'e-commerce development India',
    'Next.js development agency',
    'React development company',
    'full stack development India',
    'digital agency West Bengal',
    'website design Durgapur',
    'startup app development',
    'custom software development India',
    'binaryGroww',
  ],
  authors: [{ name: 'binaryGroww', url: BASE_URL }],
  creator: 'binaryGroww',
  publisher: 'binaryGroww',
  category: 'Technology',

  /* ── Canonical & alternates ── */
  alternates: {
    canonical: '/',
  },

openGraph: {
  type: 'website',
  locale: 'en_IN',
  url: BASE_URL,
  siteName: 'binaryGroww',
  title: 'binaryGroww — Web & App Development Agency',
  description: 'We build sleek websites, powerful mobile apps, SaaS platforms, and e-commerce solutions. Based in Durgapur, India — serving clients worldwide.',
  images: [
    {
      url: `${BASE_URL}/og-image.png`,  // ← absolute URL
      width: 1200,
      height: 630,
      alt: 'binaryGroww — Web & App Development Agency',
      type: 'image/png',
    },
  ],
},

twitter: {
  card: 'summary_large_image',
  title: 'binaryGroww — Web & App Development Agency',
  description: 'We build sleek websites, powerful mobile apps, SaaS platforms, and e-commerce solutions. Based in Durgapur, India — serving clients worldwide.',
  images: [`${BASE_URL}/og-image.png`],  // ← absolute URL
},

  /* ── Favicon / App icons ── */
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },  // optional extras
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo.png',
  },

  /* ── Web app / PWA hints ── */
  manifest: '/site.webmanifest',    // optional — create one for PWA

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  /* ── Verification (add codes from Search Console / Bing / Yandex) ── */
  verification: {
    // google: 'your-google-site-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${geistMono.variable}`}>
      <head>
        {/* JSON-LD structured data — Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'binaryGroww',
              url: BASE_URL,
              logo: `${BASE_URL}/logo.png`,
              description:
                'Full-stack digital agency specialising in websites, mobile apps, SaaS platforms, and e-commerce solutions.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Near Sanaka Educational Trust Group of Institutions, Malandighi',
                addressLocality: 'Durgapur',
                addressRegion: 'West Bengal',
                postalCode: '713212',
                addressCountry: 'IN',
              },
              telephone: '+916201374052',
              areaServed: ['IN', 'AE', 'CA', 'US'],
              serviceType: [
                'Web Development',
                'Mobile App Development',
                'SaaS Development',
                'E-commerce Development',
                'Brand Identity',
                'Digital Marketing',
              ],
              sameAs: [
                // 'https://twitter.com/yourhandle',
                // 'https://linkedin.com/company/binarygroww',
                // 'https://instagram.com/binarygroww',
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#050505] text-white antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}