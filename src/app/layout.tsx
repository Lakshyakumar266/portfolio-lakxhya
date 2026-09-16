import type { Metadata } from 'next';
import { Inter, Schibsted_Grotesk, Geist } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/hooks/theme-provider';
import { SmoothScroll } from '@/components/smooth-scroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lakshya.in',
  ),
  title: {
    default: 'Lakshya Kumar | Developer, Builder, and Founder',
    template: '%s | Lakshya Kumar',
  },
  description:
    'Lakshya Kumar is a developer, builder, and founder creating thoughtful products and exploring the edge of technology.',
  applicationName: 'Lakshya Kumar',
  authors: [{ name: 'Lakshya Kumar' }],
  creator: 'Lakshya Kumar',
  publisher: 'Lakshya Kumar',
  keywords: [
    'Lakshya Kumar',
    'Lakxhya',
    'developer',
    'software engineer',
    'builder',
    'founder',
    'portfolio',
    'projects',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Lakshya Kumar | Developer, Builder, and Founder',
    description:
      "Explore Lakshya Kumar's work, experiments, writing, and professional background.",
    url: '/',
    siteName: 'Lakshya Kumar',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://ik.imagekit.io/lksimgshub/portfolio_lakxhya.in/cat-in-car.jpg',
        width: 1200,
        height: 630,
        alt: 'Lakshya Kumar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lakshya Kumar | Developer, Builder, and Founder',
    description:
      "Explore Lakshya Kumar's work, experiments, writing, and professional background.",
    images: [
      'https://ik.imagekit.io/lksimgshub/portfolio_lakxhya.in/cat-in-car.jpg',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${schibsted.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll />

          <Navbar />
          {children}
          {/* FOOTER */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
