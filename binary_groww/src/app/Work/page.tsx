import type { Metadata } from 'next'
import WorkClient from './WorkClient'

export const metadata: Metadata = {
  title: 'Our Work & Services',
  description: 'Explore binaryGroww\'s portfolio — websites, mobile apps, SaaS platforms, food delivery systems, e-commerce stores, and custom software. Real projects, real results.',
  alternates: { canonical: '/Work' },
  openGraph: {
    title: 'Our Work & Services | binaryGroww',
    description: 'From e-commerce platforms to SaaS dashboards — see what binaryGroww has built for clients across India, Dubai, Canada, and the US.',
    url: 'https://binarygroww.com/Work',
  },
}

export default function WorkPage() {
  return <WorkClient />
}