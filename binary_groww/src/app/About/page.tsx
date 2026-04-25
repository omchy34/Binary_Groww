import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about binaryGroww — a full-stack digital agency from Durgapur, India. We build websites, mobile apps, SaaS platforms, and e-commerce solutions for startups and businesses worldwide.',
  alternates: { canonical: '/About' },
  openGraph: {
    title: 'About Us | binaryGroww',
    description: 'We are creators, engineers, and strategists united by one mission — make technology simple, scalable, and impactful for every business we touch.',
    url: 'https://binarygroww.com/about',
  },
}

export default function AboutPage() {
  return <AboutClient />
}