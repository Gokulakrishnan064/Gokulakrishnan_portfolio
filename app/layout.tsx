import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gokulakrishnan S — AI Engineer & ML Developer',
  description:
    'Final Year Computer Science Engineering (AI & ML) student and AI Engineer building intelligent solutions with Machine Learning, Computer Vision, Generative AI, FastAPI, and Spring Boot.',
  keywords: [
    'Gokulakrishnan S',
    'AI Engineer',
    'Machine Learning Developer',
    'Backend Developer',
    'Computer Vision',
    'Generative AI',
    'FastAPI',
    'Spring Boot',
    'TensorFlow',
    'Portfolio',
  ],
  authors: [{ name: 'Gokulakrishnan S' }],
  creator: 'Gokulakrishnan S',
  openGraph: {
    title: 'Gokulakrishnan S — AI Engineer & ML Developer',
    description:
      'Building intelligent solutions for real-world problems with AI, ML, and scalable backend systems.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gokulakrishnan S — AI Engineer & ML Developer',
    description:
      'Building intelligent solutions for real-world problems with AI, ML, and scalable backend systems.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gokulakrishnan S',
    jobTitle: 'AI Engineer | Machine Learning Developer | Backend Developer',
    description:
      'Final Year Computer Science Engineering (AI & ML) student building intelligent solutions with Machine Learning, Computer Vision, Generative AI, FastAPI, and Spring Boot.',
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Computer Vision',
      'Generative AI',
      'FastAPI',
      'Spring Boot',
      'TensorFlow',
    ],
    sameAs: [
      'https://github.com/gokulakrishnan-s',
      'https://www.linkedin.com/in/gokulakrishnan-s',
      'https://leetcode.com/gokulakrishnan_s',
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
