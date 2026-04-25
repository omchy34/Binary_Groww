import type { Metadata } from 'next'
import { Syne, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

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

export const metadata: Metadata = {
  title: 'binaryGroww — Web & App Development Agency',
  description:
    'We build sleek websites and powerful mobile apps that grow your business in the digital age.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${geistMono.variable}`}>
      <body className="bg-[#050505] text-white antialiased">
        <Navbar/>
        {children}
        </body>
    </html>
  )
}