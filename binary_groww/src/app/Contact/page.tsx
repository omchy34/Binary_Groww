import ContactClient from './ContactClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with binaryGroww. We respond within 24 hours. Based in Durgapur, West Bengal — serving clients across India, Dubai, Canada, and the US.',
  alternates: {
    canonical: '/Contact',
  },
  openGraph: {
    title: 'Contact Us | binaryGroww',
    description:
      'Have a project in mind? Reach out to binaryGroww — we respond within 24 hours and are currently open to new projects.',
    url: 'https://binarygroww.com/contact',
  },
}

export default function Contact() {
  return <ContactClient />
}
